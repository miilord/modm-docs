# 事务

MODM 的事务使用方法参考了 Qmgo，配合 MODM 直接返回结构化数据的特性，进一步减少了代码量

## 使用方法

下面将演示插入数据和增加价格的事务

```go{10,23,38}
type Tea struct {
	modm.DefaultField `bson:",inline"`
	Type              string   `bson:"type,omitempty"`
	Category          string   `bson:"category,omitempty"`
	Toppings          []string `bson:"toppings,omitempty"`
	Price             float64  `bson:"price,omitempty"`
}

type DB struct {
	DoTransaction modm.DoTransactionFunc
	Tea           *modm.Repo[*Tea]
}

var db DB

func main() {
	// connect mongodb
    ...

	// use modm
	database := client.Database("test")
	db = DB{
		DoTransaction: modm.DoTransaction(client), // or database.Client()
		Tea:           modm.NewRepo[*Tea](database.Collection("tea")),
	}

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

	res, err := db.DoTransaction(context.Background(), func(sessCtx context.Context) (interface{}, error) {
		err = db.Tea.InsertMany(sessCtx, docs)
		if err != nil {
			return nil, err
		}

		_, err = db.Tea.UpdateMany(sessCtx, bson.M{}, bson.M{"$inc": bson.M{"price": 1}})
		if err != nil {
			return nil, err
		}

		return db.Tea.Find(sessCtx, bson.M{})
	})
	if err != nil {
		panic(err)
	}

	if tea, ok := res.([]*Tea); ok {
		for _, t := range tea {
			fmt.Printf("Type: %s, Category: %s, Toppings: %v, Price: %.2f\n", t.Type, t.Category, t.Toppings, t.Price)
		}
	}
	// Type: Masala, Category: black, Toppings: [ginger pumpkin spice cinnamon], Price: 7.75
	// Type: Gyokuro, Category: green, Toppings: [berries milk foam], Price: 6.65
	// Type: English Breakfast, Category: black, Toppings: [whipped cream honey], Price: 6.75
	// Type: Sencha, Category: green, Toppings: [lemon whipped cream], Price: 6.15
	// Type: Assam, Category: black, Toppings: [milk foam honey berries], Price: 6.65
	// Type: Matcha, Category: green, Toppings: [whipped cream honey], Price: 7.45
	// Type: Earl Grey, Category: black, Toppings: [milk foam pumpkin spice], Price: 7.15
	// Type: Hojicha, Category: green, Toppings: [lemon ginger milk foam], Price: 6.55
}
```
