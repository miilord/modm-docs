# Indexes

MODM creates indexes through the `Uniques()`, `Indexes()`, and `IndexModels()` methods of a field. To apply these indexes, you need to call either `EnsureIndexes()` or `EnsureIndexesByModel()`.

## Reference Code

```go
type User struct {
	modm.DefaultField `bson:",inline"`
	Name              string `bson:"name,omitempty" json:"name"`
	Age               uint   `bson:"age,omitempty" json:"age"`
	PhoneNumber       string `bson:"phone_number,omitempty" json:"phone_number"`
}

// Unique index
func (u *User) Uniques() []string {
	return []string{"name"}
}

// Regular index, '-' indicates descending order
func (u *User) Indexes() []string {
	return []string{"name,-age", "-name", "age,-name"}
}

// Using official mongo.IndexModel to support more index types
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
