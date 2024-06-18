# Partial Unique Indexes

To create partial indexes through the `IndexModels()` of a field, you need to call either `EnsureIndexes()` or `EnsureIndexesByModel()`.

## Reference Code

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
Currently, only index creation is supported; automatic index deletion is not supported.
:::
