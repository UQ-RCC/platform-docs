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
        { label: 'Guides', items: [
          { label: 'Getting Access', items: [
            { label: 'Access Eligibility', slug: 'guides/apply-for-bunya-access/bunyaresourcedistribution'},
            { label: 'Apply for Access', slug: 'guides/apply-for-bunya-access/apply-for-access'},
          ]},
          { label: 'Getting Started', items: [
            { label: 'Bunya Quick Start Guide', slug: 'guides/getting-started/bunya-quick-start-guide'},
            { label: 'Bunya Hardware', slug: 'guides/getting-started/bunyahardware'},
            { label: 'Intro to HPC and Linux Videos', slug: 'guides/getting-started/general-hpc-videos'},
          ]},
          { label: 'onBunya Web Interface', items: [
            { label: 'onBunya Guide', slug: 'guides/onbunya/ondemand-guide'},
          ]},
          { label: 'Slurm Queue Manager', items: [{ autogenerate: { directory: 'guides/slurm'} }] },
          { label: 'Software on Bunya', items: [{ autogenerate: { directory: 'guides/software'} }] },
          { label: 'Data on Bunya', items: [{ autogenerate: { directory: 'guides/data'} }] },
          { label: 'AI and LLM on Bunya', items: [{ autogenerate: { directory: 'guides/ai-llm-agents'} }] },
          ]},
        { label: 'Policy', items: [
          { label: 'Overview', slug: 'policy/policies'},
          { label: 'Conditions of Access', items: [{ autogenerate: { directory: 'policy/Conditions-of-Access'} }] }, 
          { label: 'Local Standard Operating Procedures', items: [{ autogenerate: {directory: 'policy/Local-Standard-Operating-Procedures'} }] },
      ]}, 
// sidebar         
      ],
//starlight                            
    }),
// integration  
  ],
// config  
});
