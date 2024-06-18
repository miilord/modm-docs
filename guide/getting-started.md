# Getting Started

## Installation

```bash
go get -u github.com/miilord/modm
```

## Declaring Models

```go
type User struct {
	modm.DefaultField `bson:",inline"`
	Name              string `bson:"name,omitempty" json:"name"`
	Age               int    `bson:"age,omitempty" json:"age"`
}
```

Models need to have the following methods, which are already implemented by `modm.DefaultField`:

```go
type Document interface {
	SetID(id primitive.ObjectID)
	BeforeInsert(ctx context.Context)
	AfterInsert(ctx context.Context)
	BeforeUpdate(ctx context.Context)
	AfterUpdate(ctx context.Context)
	AfterFind(ctx context.Context)
}
```

## Connecting to the Database

Using MODM only requires passing in a `*mongo.Collection` from the mongo-go-driver. Therefore, MODM is compatible with all libraries based on the official driver, such as qmgo.

Here is an example using the official driver:

```go
ctx := context.Background()
client, err := mongo.Connect(ctx, options.Client().ApplyURI("your mongodb uri"))
if err != nil {
	panic(err)
}
defer client.Disconnect(ctx)
database := client.Database("test")
```

## Using MODM

```go{7,12,16}
type DB struct {
	Users *modm.Repo[*User]
}
func main() {
	...
	db := DB{
		Users: modm.NewRepo[*User](database.Collection("users")),
	}
	db.Users.InsertOne(ctx, &User{Name: "gooooo", Age: 6})

	// WARNING: To query for documents containing zero values, use bson.M, bson.D, or a map.
	// FindOne() returns (*User, error)
	user, _ := db.Users.FindOne(ctx, &User{Name: "gooooo"})
	fmt.Println(user.Age) // 6

	// Find() returns ([]*User, error)
	users, _ := db.Users.Find(ctx, &User{Age: 6})
}
```

## Complete Example

```go
package main

import (
	"context"
	"fmt"

	"github.com/miilord/modm"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	modm.DefaultField `bson:",inline"`
	Name              string `bson:"name,omitempty" json:"name"`
	Age               int    `bson:"age,omitempty" json:"age"`
}

type DB struct {
	Users *modm.Repo[*User]
}

const uri = "your mongodb uri"

func main() {
	ctx := context.Background()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	database := client.Database("your database")

	// Object-Document-Mapping with MODM
	db := DB{
		Users: modm.NewRepo[*User](database.Collection("users")),
	}
	db.Users.InsertOne(ctx, &User{Name: "gooooo", Age: 6})

	// WARNING: To query for documents containing zero values, use bson.M, bson.D, or a map.
	// Fields other than the query field need to be set omitempty
	// Alternatively, consider using pointers for the appropriate fields.
	// FindOne() returns (*User, error)
	user, _ := db.Users.FindOne(ctx, &User{Name: "gooooo"})
	fmt.Println(user.Age) // 6

	// Find() returns ([]*User, error)
	users, _ := db.Users.Find(ctx, bson.M{"age": 6})
}
```
