# Statistics

## Count

Count(ctx context.Context, filter interface{}, opts ...\*options.CountOptions) (int64, error)

```go
count, err := db.Users.Count(ctx, bson.M{"name": "gooooo"})
if err != nil {
    fmt.Println(err)
}
fmt.Println(count)
```

## EstimatedCount

EstimatedCount(ctx context.Context, opts ...\*options.EstimatedDocumentCountOptions) (int64, error)

```go
count, err := db.Users.EstimatedCount(ctx)
if err != nil {
    fmt.Println(err)
}
fmt.Println(count)
```

## Distinct

Distinct(ctx context.Context, fieldName string, filter interface{}, opts ...\*options.DistinctOptions) ([]interface{}, error)

```go
values, err := db.Users.Distinct(ctx, "age", bson.M{})
if err != nil {
    fmt.Println(err)
}
fmt.Println(values)
```
