# Finding Documents

## FindOne

FindOne(ctx context.Context, filter interface{}, opts ...\*options.FindOneOptions) (doc T, err error)

```go
user, err := db.Users.FindOne(ctx, bson.M{"age": 6})
if err != nil {
    fmt.Println(err)
}
fmt.Println(user.Name) // gooooo
```

::: tip
FindOne will trigger the `AfterFind` hook.
:::

### Alternative Method: If you prefer to use a struct for the query

::: details Show Code

```go{1-2}
// WARNING: To query for documents containing zero values, use bson.M, bson.D, or a map.
// Cannot use User{Age: 0}
user, err := db.Users.FindOne(ctx, User{Age: 6})
if err != nil {
    fmt.Println(err)
}
fmt.Println(user.Name) // gooooo
```

:::

::: danger ! Warning
This method only supports non-zero fields, and other fields must be set with omitempty (or use pointers).

Not recommended for complex queries.
:::

## Find

Find(ctx context.Context, filter interface{}, opts ...\*options.FindOptions) (docs []T, err error)

```go
users, err := db.Users.Find(ctx, bson.M{"age": 6})
if err != nil {
    fmt.Println(err)
}
fmt.Println(users)
```

::: tip
This will trigger the `AfterFind` hook.
:::

## Get

Get(ctx context.Context, id interface{}, opts ...\*options.FindOneOptions) (T, error)

```go
user, err := db.Users.Get(ctx, req.ID)
if err != nil {
    fmt.Println(err)
}
fmt.Println(user)
```

::: tip
This will trigger the `AfterFind` hook.
:::
