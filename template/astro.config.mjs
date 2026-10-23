// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.example.rcc.uq.edu.au',
  integrations: [
    starlight({
      title: 'UQ Example',
      locales: { root: { label: 'English', lang: 'en-AU' } },
      editLink: { baseUrl: 'https://github.com/UQ-RCC/platform-docs/edit/main/sites/example/' },
      customCss: ['../../shared/styles/theme.css', '../../shared/styles/navbar.css'],
      head: [{ tag: 'meta', attrs: { name: 'theme-color', content: '#51247A' } }],
      components: {
        SocialIcons: './src/components/NavLinks.astro',
        ThemeSelect: '../../shared/components/ThemeSelect.astro',
      },
    }),
  ],
});
