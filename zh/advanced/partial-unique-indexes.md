# 部分唯一索引

通过字段的 `IndexModels()` 创建部分索引，需要调用 `EnsureIndexes()` 或 `EnsureIndexesByModel()`

## 参考代码

```go
type User struct {
	modm.DefaultField `bson:",inline"`
	Name              string `bson:"name,omitempty" json:"name"`
	Age               uint   `bson:"age,omitempty" json:"age"`
	PhoneNumber       string `bson:"phone_number,omitempty" json:"phone_number"`
}

func (u *User) IndexModels() []mongo.IndexModel {
	return []mongo.IndexModel{
		{
			Keys: bson.D{
				{Key: "phone_number", Value: int32(1)},
			},
			Options: options.Index().SetUnique(true).SetPartialFilterExpression(bson.D{
				{Key: "phone_number", Value: bson.D{{Key: "$exists", Value: true}}},
			}),
		},
	}
}

func main(){
    ...
    err := db.Users.EnsureIndexesByModel(ctx, &User{})
	if err != nil {
		fmt.Println(err)
	}
}
```

::: warning
目前仅支持创建索引，不支持自动删除索引
:::
