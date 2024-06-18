# Update

## UpdateOne

UpdateOne(ctx context.Context, filter interface{}, updateOrDoc interface{}, opts ...\*options.UpdateOptions) (modifiedCount int64, err error)

```go
modifiedCount, err := db.Users.UpdateOne(ctx, bson.M{"age": 6}, &User{Name: "gggggo"})
if err != nil {
    fmt.Println(err)
}
fmt.Println(modifiedCount) // 1
```

::: tip
When `updateOrDoc` is of the same type as the model, the hooks `BeforeUpdate` and `AfterUpdate` will be triggered. However, the `modifiedCount` may not be accurate in this case.
:::

::: details

```go
if doc, ok := updateOrDoc.(T); ok {
    doc.BeforeUpdate(ctx)
    defer doc.AfterUpdate(ctx)
    res, err := r.collection.UpdateOne(ctx, filter, bson.M{"$set": doc}, opts...)
    return res.ModifiedCount, err
}
```

:::

If you don't use the model as the update data, you need to manually add `bson.M{"$set": doc}`.

```go
modifiedCount, err := db.Users.UpdateOne(ctx, bson.M{"age": 6}, bson.M{"$set": bson.M{"name": "gooooo"}})
if err != nil {
    fmt.Println(err)
}
fmt.Println(modifiedCount) // 0
```

::: tip
This design allows the use of more operators! For example:

| Name         | Description                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| $currentDate | Sets the value of a field to current date, either as a Date or a Timestamp.                                                                   |
| $inc         | Increments the value of the field by the specified amount.                                                                                    |
| $min         | Only updates the field if the specified value is less than the existing field value.                                                          |
| $max         | Only updates the field if the specified value is greater than the existing field value.                                                       |
| $mul         | Multiplies the value of the field by the specified amount.                                                                                    |
| $rename      | Renames a field.                                                                                                                              |
| $set         | Sets the value of a field in a document.                                                                                                      |
| $setOnInsert | Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents. |
| $unset       | Removes the specified field from a document.                                                                                                  |

:::

## UpdateMany

UpdateMany(ctx context.Context, filter interface{}, updateOrDoc interface{}, opts ...\*options.UpdateOptions) (modifiedCount int64, err error)

```go
modifiedCount, err := db.Users.UpdateMany(ctx, bson.M{"age": 2}, &User{Name: "gggggo"})
if err != nil {
    fmt.Println(err)
}
fmt.Println(modifiedCount)
```

::: tip
When `updateOrDoc` is of the same type as the model, the hooks `BeforeUpdate` and `AfterUpdate` will be triggered. However, the `modifiedCount` may not be accurate in this case.
:::

## UpdateByID

UpdateByID(ctx context.Context, id interface{}, updateOrDoc interface{}, opts ...\*options.UpdateOptions) (modifiedCount int64, err error)

```go
modifiedCount, err := db.Users.UpdateByID(ctx, user.ID, bson.M{"$set": bson.M{"name": "gooooo"}})
if err != nil {
    fmt.Println(err)
}
fmt.Println(modifiedCount)
```

::: tip
When `updateOrDoc` is of the same type as the model, the hooks `BeforeUpdate` and `AfterUpdate` will be triggered. However, the `modifiedCount` may not be accurate in this case.
:::

## FindOneAndUpdate

FindOneAndUpdate(ctx context.Context, filter interface{}, updateOrDoc interface{}, opts ...\*options.FindOneAndUpdateOptions) (T, error)

```go
user, err := db.Users.FindOneAndUpdate(ctx, bson.M{"age": 6}, bson.M{"$set": bson.M{"name": "gooooo"}})
if err != nil {
    fmt.Println(err)
}
fmt.Println(user.ID)
```

::: tip
When `updateOrDoc` is of the same type as the model, the hooks `BeforeUpdate` and `AfterUpdate` will be triggered, while `AfterFind` has no such restriction.
:::
