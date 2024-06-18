# 快速开始

## 安装

```bash
go get -u github.com/miilord/modm
```

## 声明模型

```go
type User struct {
	modm.DefaultField `bson:",inline"`
	Name              string `bson:"name,omitempty" json:"name"`
	Age               int    `bson:"age,omitempty" json:"age"`
}
```

模型需要拥有以下方法，`modm.DefaultField` 已实现：

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

## 连接到数据库

使用 MODM 仅需传入 mongo-go-driver 中的 `*mongo.Collection`，所以 MODM 兼容所有基于官方驱动的库，例如 qmgo

下面以官方驱动为例：

```go
ctx := context.Background()
client, err := mongo.Connect(ctx, options.Client().ApplyURI("your mongodb uri"))
if err != nil {
	panic(err)
}
defer client.Disconnect(ctx)
database := client.Database("test")
```

## 开始使用

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

## 完整案例

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
