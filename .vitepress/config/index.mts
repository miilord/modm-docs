import { defineConfig } from 'vitepress'
import { en } from './en'
import { zh } from './zh'

export default defineConfig({
  title: 'MODM',
  description: 'MongoDB Wrapper with Go Generics',
  base: '/modm-docs/',
  cleanUrls: true,
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/miilord/modm' }],
    footer: {
      message: 'Released under the MIT License.',
    },
    search: {
      provider: 'local',
    },
  },
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh },
  },
})
