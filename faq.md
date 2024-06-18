# FAQ

## Why don't hooks return an error?

Consider this code:

```go
func (r *Repo[T]) InsertOne(ctx context.Context, doc T, opts ...*options.InsertOneOptions) (T, error) {
    if err := doc.BeforeInsert(ctx); err != nil {
        return *new(T), err
    }

    _, err := r.collection.InsertOne(ctx, doc, opts...)
    if err != nil {
        return *new(T), err
    }

    if err = doc.AfterInsert(ctx); err != nil {
        return *new(T), err
    }
    return doc, err
}
```

If an error occurs in the `AfterInsert` hook and it returns `nil, error`, it is counterintuitive because the data has already been written to the database.

The correct approach would be to roll back the operation if an error occurs, which involves using transactions. In many ORM libraries, such as [gorm, hooks also use transactions by default](https://gorm.io/docs/transactions.html).

Due to development cost considerations (handling errors can be complex), transactions are not currently implemented in MODM.

## About BeforeDelete/AfterDelete

Not supported at the moment. The proposed solution is:

```go
func (r *Repo[T]) DeleteOne(ctx context.Context, filter interface{}, opts ...*options.DeleteOptions) error {
    var doc T
    if err := r.collection.FindOne(ctx, filter).Decode(&doc); err == nil {
        doc.BeforeDelete(ctx)
        defer doc.AfterDelete(ctx)
    }
    _, err := r.collection.DeleteOne(ctx, filter, opts...)
    return err
}
```

This approach is less practical and adds an additional query operation. Therefore, further discussion is needed before implementation.

## About BeforeFind

As mentioned in the [hooks tutorial](/en/reference/hooks), model hooks require passing the model into methods to trigger them. Methods like Find/Delete do not require passing the model, so `BeforeFind` and `BeforeDelete` are unlikely to be implemented.

## About ReplaceOne

I do not recommend using this method, hence there are no hooks for it.

## Why is there no exists() method?

In mongoose.js, `model.exists()` returns `_id`:

```js
/**
 * Returns a document with `_id` only if at least one document exists in the database that matches
 * the given `filter`, and `null` otherwise.
 *
 * Under the hood, `MyModel.exists({ answer: 42 })` is equivalent to
 * `MyModel.findOne({ answer: 42 }).select({ _id: 1 }).lean()`
 *
 * #### Example:
 *
 *     await Character.deleteMany({});
 *     await Character.create({ name: 'Jean-Luc Picard' });
 *
 *     await Character.exists({ name: /picard/i }); // { _id: ... }
 *     await Character.exists({ name: /riker/i }); // null
 *
 * This function triggers the following middleware.
 *
 * - `findOne()`
 *
 * @param {Object} filter
 * @param {Object} [options] optional see [`Query.prototype.setOptions()`](https://mongoosejs.com/docs/api/query.html#Query.prototype.setOptions())
 * @return {Query}
 */

Model.exists = function exists(filter, options) {
  _checkContext(this, 'exists')
  if (typeof arguments[2] === 'function') {
    throw new MongooseError('Model.exists() no longer accepts a callback')
  }

  const query = this.findOne(filter)
    .select({ _id: 1 })
    .lean()
    .setOptions(options)

  return query
}
```

Currently, you can use `IsDocumentExists()` to achieve similar functionality:

```go
_, err := db.Mongo.Account.FindOne(context.TODO(), filter)
exists, err := modm.IsDocumentExists(err)
if err != nil {
    return err
}
if !exists {
    return fmt.Errorf("Document not found")
}
```

If you need to check for `_id`, simply return the document in `FindOne()`.
