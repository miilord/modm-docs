# FAQ

## 为什么 hooks 不返回 error

看这个代码：

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

假如在 AfterInsert 钩子中发生了错误，返回`nil, error`，这在处理 error 时是反直觉的，因为数据已经写入数据库。

正确的做法是发生错误就回滚操作，也就是事务。
在许多 orm 库中，[如 gorm，hooks 也是默认使用事务](https://gorm.io/zh_CN/docs/transactions.html)。

受限于开发成本考虑(对错误的处理会比较复杂)，目前不使用事务方案。

## 关于 BeforeDelete/AfterDelete

暂不支持，目前设想的方案是：

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

实用性较低，且会增加一次查询操作，所以等待后续讨论再开发

## 关于 BeforeFind

正如[钩子教程](/zh/reference/hooks)提到的，模型钩子需要在方法中传入模型才能触发，而 Find/Delete 等方法是不需要传入模型的，所以 BeforeFind 和 BeforeDelete 大概率不会有

## 关于 ReplaceOne

我不推荐使用该方法，所以也没有钩子

## 为什么没有 exists()

mongoose.js 中 `model.exists()` 返回 `_id`：

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

目前，可以使用 `IsDocumentExists()` 来处理

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

如果需要使用 `_id` 则在 `FindOne()` 处返回文档即可
