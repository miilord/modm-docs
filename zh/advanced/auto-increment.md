# 自增 ID

MongoDB 并不支持 `AUTO_INCREMENT`，在实际业务中，我们可以借助原子性操作以及事务实现这一需求

## 参考代码

```go
package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/miilord/modm"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Counter struct {
	modm.DefaultField `bson:",inline"`
	Key               string `bson:"key"`
	Value             int64  `bson:"value,omitempty"`
}

func (*Counter) Uniques() []string {
	return []string{"key"}
}

type User struct {
	modm.DefaultField `bson:",inline"`
	UID               int64  `bson:"uid"`
	Name              string `bson:"name"`
}

func (*User) Uniques() []string {
	return []string{"uid"}
}

type DB struct {
	DoTransaction modm.DoTransactionFunc
	Counters      *modm.Repo[*Counter]
	Users         *modm.Repo[*User]
}

var db DB

func InsertUser(doc *User) (*User, error) {
	user, err := db.DoTransaction(context.Background(), func(sessCtx context.Context) (interface{}, error) {
		userCount, err := db.Counters.FindOneAndUpdate(
			sessCtx,
			bson.M{"key": "user_count"},
			bson.M{"$inc": bson.M{"value": 1}},
			options.FindOneAndUpdate().SetUpsert(true),
		)
		if err != nil {
			return nil, err
		}

		doc.UID = userCount.Value
		return db.Users.InsertOne(sessCtx, doc)
	})
	if err != nil {
		return nil, err
	}
	if u, ok := user.(*User); ok {
		return u, nil
	}
	return nil, errors.New("data and type mismatch")
}

func main() {
	// connect mongoDB
    ...

	// use modm
	database := client.Database("test")
	db = DB{
		DoTransaction: modm.DoTransaction(client), // or database.Client()
		Counters:      modm.NewRepo[*Counter](database.Collection("counters")),
		Users:         modm.NewRepo[*User](database.Collection("users")),
	}
	_ = db.Counters.EnsureIndexesByModel(context.TODO(), &Counter{})
	_ = db.Users.EnsureIndexesByModel(context.TODO(), &User{})

	docs := []*User{
		{Name: "one"},
		{Name: "two"},
	}

	for _, doc := range docs {
		user, _ := InsertUser(doc)
		fmt.Printf("Name: %s, UID: %v\n", user.Name, user.UID)
	}
	// Name: one, UID: 1
	// Name: two, UID: 2
}

```
