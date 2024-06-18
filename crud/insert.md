# Insert

Let's take `User` as an example:

```go
type User struct {
	modm.DefaultField `bson:",inline"`
	Name              string `bson:"name,omitempty" json:"name"`
	Age               int    `bson:"age,omitempty" json:"age"`
}
```

## InsertOne

InsertOne(ctx context.Context, doc T, opts ...\*options.InsertOneOptions) (T, error)

```go
user, err := db.Users.InsertOne(context.Background(), &User{Name: "gooooo", Age: 6})
if err != nil {
    fmt.Println(err)
}
fmt.Println(user.ID)
```

::: tip
This will trigger the `BeforeInsert` and `AfterInsert` hooks.
:::

## InsertMany

InsertMany(ctx context.Context, docs []T, opts ...\*options.InsertManyOptions) error

```go
err := db.Users.InsertMany(context.Background(), []*User{{Name: "gooooo", Age: 6}, {Name: "go", Age: 2}})
if err != nil {
    fmt.Println(err)
}
```

::: tip
This will trigger the `BeforeInsert` and `AfterInsert` hooks.
:::
