# Aggregation

The usage of aggregation in MODM is nearly identical to the official MongoDB driver.

Below is an example from the [official tutorial](https://www.mongodb.com/docs/drivers/go/current/fundamentals/aggregation/):

```go
type Tea struct {
	modm.DefaultField `bson:",inline"`
	Type              string
	Category          string
	Toppings          []string
	Price             float64
}
```

```go {20-21}
docs := []*Tea{
    {Type: "Masala", Category: "black", Toppings: []string{"ginger", "pumpkin spice", "cinnamon"}, Price: 6.75},
    {Type: "Gyokuro", Category: "green", Toppings: []string{"berries", "milk foam"}, Price: 5.65},
    {Type: "English Breakfast", Category: "black", Toppings: []string{"whipped cream", "honey"}, Price: 5.75},
    {Type: "Sencha", Category: "green", Toppings: []string{"lemon", "whipped cream"}, Price: 5.15},
    {Type: "Assam", Category: "black", Toppings: []string{"milk foam", "honey", "berries"}, Price: 5.65},
    {Type: "Matcha", Category: "green", Toppings: []string{"whipped cream", "honey"}, Price: 6.45},
    {Type: "Earl Grey", Category: "black", Toppings: []string{"milk foam", "pumpkin spice"}, Price: 6.15},
    {Type: "Hojicha", Category: "green", Toppings: []string{"lemon", "ginger", "milk foam"}, Price: 5.55},
}
_ = db.Tea.InsertMany(ctx, docs)

groupStage := bson.D{
    {"$group", bson.D{
        {"_id", "$category"},
        {"average_price", bson.D{{"$avg", "$price"}}},
        {"type_total", bson.D{{"$sum", 1}}},
    }}}

var result []bson.M
err := db.Tea.Aggregate(ctx, mongo.Pipeline{groupStage}, &result)
if err != nil {
    fmt.Println(err)
}
fmt.Println(result)
// [map[_id:black average_price:6.075 type_total:4] map[_id:green average_price:5.7 type_total:4]]
```
