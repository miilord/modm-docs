import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/what-is-modm' },
      { text: 'API', link: 'https://pkg.go.dev/github.com/miilord/modm' },
      { text: 'FAQ', link: '/faq' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'what is MODM?', link: '/guide/what-is-modm' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Comparison', link: '/guide/comparison' },
        ],
      },
      {
        text: 'CRUD Operation',
        items: [
          { text: 'Insert', link: '/crud/insert' },
          { text: 'Find', link: '/crud/find' },
          { text: 'Update', link: '/crud/update' },
          { text: 'Delete', link: '/crud/delete' },
          { text: 'Statistics', link: '/crud/statistics' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Hooks', link: '/reference/hooks' },
          { text: 'Indexes', link: '/reference/indexes' },
          { text: 'Aggregation', link: '/reference/aggregation' },
          { text: 'Transactions', link: '/reference/transactions' },
        ],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Auto Increment', link: '/advanced/auto-increment' },
          {
            text: 'Partial Unique Indexes',
            link: '/advanced/partial-unique-indexes',
          },
        ],
      },
    ],
  },
})
