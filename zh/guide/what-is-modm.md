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

MODM 是一个 mongodb 的 ODM 库，适用于 GO 1.18 以上版本，通过使用泛型代替 codegen 等方案

::: tip
MODM 的设计原则是：简单、便捷、实用，所以会尽可能保持和官方驱动一致的类型、语法
:::

## 特性

- CRUD 操作中**直接返回结构化数据**
- 无需 codegen
- 灵活的 hooks
- 字段自动化
- 同步索引
- 用户友好型事务

## 使用方法

```go{4}
db := DB{
    Users: modm.NewRepo[*User](database.Collection("users")),
}
// Find() returns ([]*User, error)
users, _ := db.Users.Find(ctx, bson.M{"age": 18})
```

::: tip
你可以在[快速开始](./getting-started)中查看完整案例
:::
