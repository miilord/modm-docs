# What is MODM?

<p class="badges">
    <a href="https://goreportcard.com/report/github.com/miilord/modm" rel="nofollow" target="_blank">
        <img src="https://goreportcard.com/badge/github.com/miilord/modm" alt="Go Report Card">
    </a>
    <a href="https://github.com/miilord/modm/actions/workflows/go.yml" rel="nofollow" target="_blank">
        <img src="https://github.com/miilord/modm/actions/workflows/go.yml/badge.svg?branch=main" alt="Go">
    </a>
    <a href="https://pkg.go.dev/github.com/miilord/modm" rel="nofollow" target="_blank">
        <img src="https://pkg.go.dev/badge/github.com/miilord/modm.svg" alt="Go Reference">
    </a>
    <a href="https://github.com/miilord/modm/raw/main/LICENSE" rel="nofollow" target="_blank">
        <img src="https://img.shields.io/github/license/miilord/modm" alt="GitHub">
    </a>
    <a href="https://coveralls.io/github/miilord/modm?branch=main" rel="nofollow" target="_blank">
        <img src="https://coveralls.io/repos/github/miilord/modm/badge.svg?branch=main" alt="Coverage Status">
    </a>
</p>

<style scoped>
.badges {
  display: flex;
  gap: 0.5rem;
}
</style>

<div class="warning custom-block" style="padding-top: 8px">

This document was translated using GPT-4o.

</div>

MODM is an ODM (Object-Document Mapper) library for MongoDB, designed for use with Go version 1.18 and above. It leverages generics instead of code generation and other similar approaches.

::: tip
MODM is designed with the principles of simplicity, convenience, and practicality in mind. Therefore, it aims to maintain consistency with the official MongoDB driver in terms of types and syntax as much as possible.
:::

## Features

- **Direct return of structured data** in CRUD operations
- No need for code generation
- Flexible hooks
- Automated field management
- Synchronized indexes
- User-friendly transactions

## Use Cases

```go{4}
db := DB{
    Users: modm.NewRepo[*User](database.Collection("users")),
}
// Find() returns ([]*User, error)
users, _ := db.Users.Find(ctx, bson.M{"age": 18})
```

::: tip
You can check out the complete example in the [Getting Started](./getting-started) section.
:::
