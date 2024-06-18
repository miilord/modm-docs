import { defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/zh/guide/what-is-modm',
        activeMatch: '/zh/guide/',
      },
      { text: 'API', link: 'https://pkg.go.dev/github.com/miilord/modm' },
      { text: 'FAQ', link: '/zh/faq' },
    ],
    sidebar: [
      {
        text: '入门指南',
        items: [
          { text: '什么是 MODM？', link: '/zh/guide/what-is-modm' },
          { text: '快速开始', link: '/zh/guide/getting-started' },
          { text: '对比', link: '/zh/guide/comparison' },
        ],
      },
      {
        text: 'CRUD 操作',
        items: [
          { text: '插入', link: '/zh/crud/insert' },
          { text: '查找', link: '/zh/crud/find' },
          { text: '更新', link: '/zh/crud/update' },
          { text: '删除', link: '/zh/crud/delete' },
          { text: '统计', link: '/zh/crud/statistics' },
        ],
      },
      {
        text: '教程',
        items: [
          { text: '钩子', link: '/zh/reference/hooks' },
          { text: '索引', link: '/zh/reference/indexes' },
          { text: '聚合', link: '/zh/reference/aggregation' },
          { text: '事务', link: '/zh/reference/transactions' },
        ],
      },
      {
        text: '高级',
        items: [
          { text: '自增 ID', link: '/zh/advanced/auto-increment' },
          {
            text: '部分唯一索引',
            link: '/zh/advanced/partial-unique-indexes',
          },
        ],
      },
    ],
  },
})
