# 查找

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
FindOne 会触发钩子`AfterFind`
:::

### 方法二：如果你想使用结构体进行查找

::: details 显示代码

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

::: danger ! 警告
该方法仅支持非零字段，且其他字段需要设置 `omitempty`（或使用指针）

在复杂业务中，不推荐使用
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
此处会触发钩子`AfterFind`
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
此处会触发钩子`AfterFind`
:::
