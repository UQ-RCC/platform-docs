// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'UQ RCC HPC',
      locales: { root: { label: 'English', lang: 'en-AU' } },
      editLink: { baseUrl: 'https://github.com/UQ-RCC/platform-docs/edit/main/sites/hpc/' },
      customCss: ['../../shared/styles/navbar.css'],
      components: {
        ThemeSelect: '../../shared/components/ThemeSelect.astro',
      },
      sidebar: [
        { label: 'Overview', slug: 'overview' },
        { label: 'Bunya updates', slug: 'bunya-updates' },
        { label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
        { label: 'Policy', items: [
//          { label: 'Overview', slug: 'policy/Policies'},
          { label: 'Conditions of Access', items: [{ autogenerate: { directory: 'policy/Conditions-of-Access'} }] }, 
          { label: 'Local Standard Operating Procedures', items: [{ autogenerate: {directory: 'policy/Local-Standard-Operating-Procedures'} }] },
      ] },
      ],
    }),
  ],
});
