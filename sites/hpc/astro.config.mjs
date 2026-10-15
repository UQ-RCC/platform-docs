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
//                    
          { label: 'Getting Access', items: [
            { label: 'Access Eligibility', slug: 'guides/apply-for-bunya-access/bunyaresourcedistribution'},
            { label: 'Apply for Access', slug: 'guides/apply-for-bunya-access/apply-for-access'},
          ]},
//                    
          { label: 'Getting Started', items: [
            { label: 'Bunya Quick Start Guide', slug: 'guides/getting-started/bunya-quick-start-guide'},
            { label: 'Bunya Hardware', slug: 'guides/getting-started/bunyahardware'},
            { label: 'Intro to HPC and Linux Videos', slug: 'guides/getting-started/general-hpc-videos'},
          ]},
//          
          { label: 'Accessing Bunya', items: [
            { label: 'Connecting to Bunya', slug: 'guides/accessing-bunya/connecting-to-bunya'},
            { label: 'SSH Multiplexing', slug: 'guides/accessing-bunya/bunya-ssh-multiplexing-guide'},
            { label: 'Tmux', slug: 'guides/accessing-bunya/basics-tmux'},
          ]},
//          
          { label: 'onBunya Web Interface', items: [
            { label: 'onBunya Guide', slug: 'guides/onbunya/ondemand-guide'},
          ]},
//          
          { label: 'Slurm Queue Manager', items: [
            { label: 'Fair Share', slug: 'guides/slurm/fairshare'},
            { label: 'Accounting Groups and Administration', slug: 'guides/slurm/accounting-group-admin'},
            { label: 'Interactive Jobs', slug: 'guides/slurm/interactivejobs'},
            { label: 'Available Partitions', slug: 'guides/slurm/partitions'},
            { label: 'Available QoS', slug: 'guides/slurm/qos'},
            { label: 'Batch Jobs', slug: 'guides/slurm/batchjobs'},
            { label: 'Example Batch Slurm Scripts', slug: 'guides/slurm/exampleslurmscripts'},
            { label: 'Monitoring and Deleting Jobs', slug: 'guides/slurm/monitoringjobs'},
            { label: 'Slurm Tips', slug: 'guides/slurm/slurm-tips'},
            { label: 'MPI Testing for Experts Only', slug: 'guides/slurm/expert-only-mpi-testing'},
          ]},
//   
          { label: 'Data on Bunya', items: [
            { label: 'User Data Spaces and Quotas', slug: 'guides/data/bunya-userdata-guide'},
            { label: 'Transferring Data', slug: 'guides/data/datatransfer'},
            { label: 'Available Data Sets and Models', slug: 'guides/data/list-of-datasets'},
            { label: 'UQRDM Access on Bunya', slug: 'guides/data/rdm-guide'},
          ]},
//          
          { label: 'Software on Bunya', items: [{ autogenerate: { directory: 'guides/Software'} }
          ]},
//          
          { label: 'AI and LLM on Bunya', items: [{ autogenerate: { directory: 'guides/AI-LLM-Agents'} }] },
          ]},
//        
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
