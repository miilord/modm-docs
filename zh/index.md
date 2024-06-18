---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'MODM'
  text: 'The MongoDB ODM for Go'
  tagline: 更简单、优雅地使用 mongo-go-driver
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/what-is-modm
    - theme: alt
      text: API Examples
      link: /zh/crud/insert

features:
  - title: 不需要破坏现有代码
    details: 你可以同时使用 mongo-go-driver、qmgo 等驱动程序
  - title: 不需要代码生成
    details: 通过 GO 1.18 的泛型特性，使代码量更少
  - title: 灵活的 Hooks
    details: 支持自动化更新 fields
---
