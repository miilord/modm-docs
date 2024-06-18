# Comparison

MODM wraps some methods from the official MongoDB driver. For methods that are not wrapped, you can use `Collection()` or `Clone()` to access the `*mongo.Collection`.

| Mongo-go-driver        | MODM                 |
| ---------------------- | -------------------- |
| Clone                  | :white_check_mark:   |
| Name                   | :white_check_mark:   |
| Database               |                      |
| BulkWrite              |                      |
| InsertOne              | :white_check_mark:   |
| InsertMany             | :white_check_mark:   |
| DeleteOne              | :white_check_mark:   |
| DeleteMany             | :white_check_mark:   |
| UpdateByID             | :white_check_mark:   |
| UpdateOne              | :white_check_mark:   |
| UpdateMany             | :white_check_mark:   |
| ReplaceOne             |                      |
| Aggregate              | :white_check_mark:   |
| CountDocuments         | Count                |
| EstimatedDocumentCount | EstimatedCount       |
| Distinct               | :white_check_mark:   |
| Find                   | :white_check_mark:   |
| FindOne                | :white_check_mark:   |
| FindOneAndDelete       | :white_check_mark:   |
| FindOneAndReplace      |                      |
| FindOneAndUpdate       | :white_check_mark:   |
| Watch                  |                      |
| Indexes                |                      |
| Drop                   |                      |
|                        | Get                  |
|                        | EnsureIndexes        |
|                        | EnsureIndexesByModel |
|                        | Collection           |

Additionally, MODM supports hooks, indexes, and transactions.

## Reference

MODM:

```go
type IRepo[T Document] interface {
	Aggregate(ctx context.Context, pipeline interface{}, res interface{}, opts ...*options.AggregateOptions) error
	Clone(opts ...*options.CollectionOptions) (*mongo.Collection, error)
	Collection() *mongo.Collection
	Count(ctx context.Context, filter interface{}, opts ...*options.CountOptions) (int64, error)
	CountDocuments(ctx context.Context, filter interface{}, opts ...*options.CountOptions) (int64, error)
	DeleteMany(ctx context.Context, filter interface{}, opts ...*options.DeleteOptions) (deletedCount int64, err error)
	DeleteOne(ctx context.Context, filter interface{}, opts ...*options.DeleteOptions) (deletedCount int64, err error)
	Distinct(ctx context.Context, fieldName string, filter interface{}, opts ...*options.DistinctOptions) ([]interface{}, error)
	EnsureIndexes(ctx context.Context, uniques []string, indexes []string, indexModels ...mongo.IndexModel) error
	EnsureIndexesByModel(ctx context.Context, model Indexes) error
	EstimatedCount(ctx context.Context, opts ...*options.EstimatedDocumentCountOptions) (int64, error)
	EstimatedDocumentCount(ctx context.Context, opts ...*options.EstimatedDocumentCountOptions) (int64, error)
	Find(ctx context.Context, filter interface{}, opts ...*options.FindOptions) (docs []T, err error)
	FindOne(ctx context.Context, filter interface{}, opts ...*options.FindOneOptions) (doc T, err error)
	FindOneAndDelete(ctx context.Context, filter interface{}, opts ...*options.FindOneAndDeleteOptions) (doc T, err error)
	FindOneAndUpdate(ctx context.Context, filter interface{}, updateOrDoc interface{}, opts ...*options.FindOneAndUpdateOptions) (T, error)
	Get(ctx context.Context, id interface{}, opts ...*options.FindOneOptions) (T, error)
	InsertMany(ctx context.Context, docs []T, opts ...*options.InsertManyOptions) error
	InsertOne(ctx context.Context, doc T, opts ...*options.InsertOneOptions) (T, error)
	Name() string
	UpdateByID(ctx context.Context, id interface{}, updateOrDoc interface{}, opts ...*options.UpdateOptions) (modifiedCount int64, err error)
	UpdateMany(ctx context.Context, filter interface{}, updateOrDoc interface{}, opts ...*options.UpdateOptions) (modifiedCount int64, err error)
	UpdateOne(ctx context.Context, filter interface{}, updateOrDoc interface{}, opts ...*options.UpdateOptions) (modifiedCount int64, err error)
}
```

mongo-go-driver:

```go
type IMongoCollection interface {
	Aggregate(ctx context.Context, pipeline interface{}, opts ...*options.AggregateOptions) (*mongo.Cursor, error)
	BulkWrite(ctx context.Context, models []mongo.WriteModel, opts ...*options.BulkWriteOptions) (*mongo.BulkWriteResult, error)
	Clone(opts ...*options.CollectionOptions) (*mongo.Collection, error)
	CountDocuments(ctx context.Context, filter interface{}, opts ...*options.CountOptions) (int64, error)
	Database() *mongo.Database
	DeleteMany(ctx context.Context, filter interface{}, opts ...*options.DeleteOptions) (*mongo.DeleteResult, error)
	DeleteOne(ctx context.Context, filter interface{}, opts ...*options.DeleteOptions) (*mongo.DeleteResult, error)
	Distinct(ctx context.Context, fieldName string, filter interface{}, opts ...*options.DistinctOptions) ([]interface{}, error)
	Drop(ctx context.Context) error
	EstimatedDocumentCount(ctx context.Context, opts ...*options.EstimatedDocumentCountOptions) (int64, error)
	Find(ctx context.Context, filter interface{}, opts ...*options.FindOptions) (cur *mongo.Cursor, err error)
	FindOne(ctx context.Context, filter interface{}, opts ...*options.FindOneOptions) *mongo.SingleResult
	FindOneAndDelete(ctx context.Context, filter interface{}, opts ...*options.FindOneAndDeleteOptions) *mongo.SingleResult
	FindOneAndReplace(ctx context.Context, filter interface{}, replacement interface{}, opts ...*options.FindOneAndReplaceOptions) *mongo.SingleResult
	FindOneAndUpdate(ctx context.Context, filter interface{}, update interface{}, opts ...*options.FindOneAndUpdateOptions) *mongo.SingleResult
	Indexes() mongo.IndexView
	InsertMany(ctx context.Context, documents []interface{}, opts ...*options.InsertManyOptions) (*mongo.InsertManyResult, error)
	InsertOne(ctx context.Context, document interface{}, opts ...*options.InsertOneOptions) (*mongo.InsertOneResult, error)
	Name() string
	ReplaceOne(ctx context.Context, filter interface{}, replacement interface{}, opts ...*options.ReplaceOptions) (*mongo.UpdateResult, error)
	UpdateByID(ctx context.Context, id interface{}, update interface{}, opts ...*options.UpdateOptions) (*mongo.UpdateResult, error)
	UpdateMany(ctx context.Context, filter interface{}, update interface{}, opts ...*options.UpdateOptions) (*mongo.UpdateResult, error)
	UpdateOne(ctx context.Context, filter interface{}, update interface{}, opts ...*options.UpdateOptions) (*mongo.UpdateResult, error)
	Watch(ctx context.Context, pipeline interface{}, opts ...*options.ChangeStreamOptions) (*mongo.ChangeStream, error)
}
```
