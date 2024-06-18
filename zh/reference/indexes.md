# 索引

MODM 通过字段的 `Uniques()`、`Indexes()`、`IndexModels()` 创建索引，需要调用 `EnsureIndexes()` 或 `EnsureIndexesByModel()`

## 参考代码

```go
type User struct {
	modm.DefaultField `bson:",inline"`
	Name              string `bson:"name,omitempty" json:"name"`
	Age               uint   `bson:"age,omitempty" json:"age"`
	PhoneNumber       string `bson:"phone_number,omitempty" json:"phone_number"`
}

// 唯一索引
func (u *User) Uniques() []string {
	return []string{"name"}
}

// 普通索引，`-`表示降序
func (u *User) Indexes() []string {
	return []string{"name,-age", "-name", "age,-name"}
}

// 使用官方 mongo.IndexModel 支持更多索引类型
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
