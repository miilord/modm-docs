# Delete

## DeleteOne

DeleteOne(ctx context.Context, filter interface{}, opts ...\*options.DeleteOptions) (deletedCount int64, err error)

```go
deletedCount, err := db.Users.DeleteOne(ctx, bson.M{"name": "gooooo"})
if err != nil {
    fmt.Println(err)
}
fmt.Println(deletedCount)
```

## DeleteMany

DeleteMany(ctx context.Context, filter interface{}, opts ...\*options.DeleteOptions) (deletedCount int64, err error)

```go
deletedCount, err := db.Users.DeleteMany(ctx, bson.M{"name": "gooooo"})
if err != nil {
    fmt.Println(err)
}
fmt.Println(deletedCount)
```

## FindOneAndDelete

FindOneAndDelete(ctx context.Context, filter interface{}, opts ...\*options.FindOneAndDeleteOptions) (doc T, err error)

```go
user, err := db.Users.FindOneAndDelete(ctx, bson.M{"name": "gooooo"})
if err != nil {
    fmt.Println(err)
}
fmt.Println(user)
```

::: tip
Hooks: `AfterFind`
:::
