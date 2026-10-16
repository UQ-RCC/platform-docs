// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const SITE = 'https://docs.xnat.rcc.uq.edu.au';

// Every content page's slug (used to redirect the old Hugo `/docs/...` URLs).
const slugs = [
  'user-guides',
  'user-guides/getting-started',
  'user-guides/logging-into-xnat',
  'user-guides/using-xnat',
  'user-guides/using-xnat/projects',
  'user-guides/using-xnat/projects/granting-access',
  'user-guides/using-xnat/projects/request-storage',
  'user-guides/using-xnat/subjects',
  'user-guides/using-xnat/sessions',
  'user-guides/using-xnat/search',
  'user-guides/managing-data/downloading-data',
  'user-guides/managing-data/viewing-images',
  'user-guides/managing-data/uploading-data',
  'user-guides/managing-data/uploading-data/web-upload',
  'user-guides/managing-data/uploading-data/resource-uploader',
  'user-guides/managing-data/uploading-data/prearchive',
  'user-guides/managing-data/syncing-data',
  'user-guides/managing-data/anonymising-data',
  'user-guides/managing-data/anonymising-data/project-anonymiser',
  'user-guides/managing-data/anonymising-data/site-anonymiser',
  'user-guides/processing-data',
  'user-guides/processing-data/command-line-tools',
  'user-guides/processing-data/interactive-analysis',
];

// Old Hugo `/docs/<slug>` -> new `/<slug>`, plus the legacy Hugo aliases.
const redirects = {
  '/docs': '/',
  ...Object.fromEntries(slugs.map((s) => [`/docs/${s}`, `/${s}`])),
  // Retired placeholder and duplicate hub pages.
  '/user-guides/faq': '/support',
  '/docs/user-guides/faq': '/support',
  '/user-guides/managing-data': '/user-guides/managing-data/uploading-data',
  '/docs/user-guides/managing-data': '/user-guides/managing-data/uploading-data',
  // Getting Started was split into per-member pages; it's now a single tabbed
  // page that selects the member type via a `?member=` query param. Redirect
  // every old per-member URL (both the Astro and original Hugo `/docs/` forms)
  // and the legacy Hugo aliases to the matching tab.
  '/user-guides/getting-started/uq-members':
    '/user-guides/getting-started/?member=aaf-members',
  '/user-guides/getting-started/other-aaf-members':
    '/user-guides/getting-started/?member=aaf-members',
  '/user-guides/getting-started/non-aaf-members':
    '/user-guides/getting-started/?member=non-aaf-members',
  '/user-guides/getting-started/hirf-users': '/user-guides/getting-started/',
  '/docs/user-guides/getting-started/uq-members':
    '/user-guides/getting-started/?member=aaf-members',
  '/docs/user-guides/getting-started/other-aaf-members':
    '/user-guides/getting-started/?member=aaf-members',
  '/docs/user-guides/getting-started/non-aaf-members':
    '/user-guides/getting-started/?member=non-aaf-members',
  '/docs/user-guides/getting-started/hirf-users': '/user-guides/getting-started/',

  // The standalone "AAF login" page was merged into the Logging into XNAT
  // overview (AAF tab). Alias tokens moved to Processing Data (it's about
  // authenticating external tools, not website login).
  '/user-guides/logging-into-xnat/aaf-login': '/user-guides/logging-into-xnat/',
  '/docs/user-guides/logging-into-xnat/aaf-login': '/user-guides/logging-into-xnat/',
  '/user-guides/logging-into-xnat/alias-tokens':
    '/user-guides/processing-data/alias-tokens',
  '/docs/user-guides/logging-into-xnat/alias-tokens':
    '/user-guides/processing-data/alias-tokens',

  // Scans folded into the Sessions overview.
  '/user-guides/using-xnat/sessions/scans':
    '/user-guides/using-xnat/sessions/#viewing-scans',
  '/docs/user-guides/using-xnat/sessions/scans':
    '/user-guides/using-xnat/sessions/#viewing-scans',

  // The three download method pages merged into one tabbed page. The ?method=
  // values are the tab labels slugified by TabQueryLink; they must match the
  // labels in downloading-data/index.mdx.
  '/user-guides/managing-data/downloading-data/zip-download':
    '/user-guides/managing-data/downloading-data/?method=zip-download',
  '/user-guides/managing-data/downloading-data/desktop-client':
    '/user-guides/managing-data/downloading-data/?method=desktop-client',
  '/user-guides/managing-data/downloading-data/download-scan':
    '/user-guides/managing-data/downloading-data/?method=individual-scans',
  '/docs/user-guides/managing-data/downloading-data/zip-download':
    '/user-guides/managing-data/downloading-data/?method=zip-download',
  '/docs/user-guides/managing-data/downloading-data/desktop-client':
    '/user-guides/managing-data/downloading-data/?method=desktop-client',
  '/docs/user-guides/managing-data/downloading-data/download-scan':
    '/user-guides/managing-data/downloading-data/?method=individual-scans',

  // CTP was retired; its pages are gone. Send the old URLs to the remaining
  // upload methods rather than 404.
  '/facility-guides': '/user-guides/managing-data/uploading-data',
  '/facility-guides/ctp': '/user-guides/managing-data/uploading-data',
  '/facility-guides/ctp/installation': '/user-guides/managing-data/uploading-data',
  '/facility-guides/ctp/proxy-server': '/user-guides/managing-data/uploading-data',
  '/facility-guides/ctp/run-as-service': '/user-guides/managing-data/uploading-data',
  '/facility-guides/ctp/windows-service': '/user-guides/managing-data/uploading-data',
  '/facility-guides/ctp/linux-service': '/user-guides/managing-data/uploading-data',
  '/docs/facility-guides': '/user-guides/managing-data/uploading-data',
  '/docs/facility-guides/ctp': '/user-guides/managing-data/uploading-data',
  '/docs/facility-guides/ctp/installation': '/user-guides/managing-data/uploading-data',
  '/docs/facility-guides/ctp/proxy-server': '/user-guides/managing-data/uploading-data',
  '/docs/facility-guides/ctp/run-as-service': '/user-guides/managing-data/uploading-data',
  '/docs/facility-guides/ctp/windows-service': '/user-guides/managing-data/uploading-data',
  '/docs/facility-guides/ctp/linux-service': '/user-guides/managing-data/uploading-data',

  // Legacy aliases declared in the original Hugo front matter.
  // Project creation now has its own page; these legacy URLs were always about
  // creating a project rather than onboarding.
  '/docs/user-guides/create-xnat-project':
    '/user-guides/using-xnat/projects/your-project',
  '/docs/user-guides/create-xnat-project/create-q-collection-uq-users':
    '/user-guides/using-xnat/projects/your-project',
  '/docs/user-guides/create-xnat-project/create-q-collection-non-uq-users':
    '/user-guides/using-xnat/projects/your-project',
  '/docs/user-guides/browsing-xnat': '/user-guides/using-xnat',
  '/docs/user-guides/login-to-xnat': '/user-guides/logging-into-xnat',
  '/docs/user-guides/login-to-xnat/aaf-login': '/user-guides/logging-into-xnat/',
};

// https://astro.build/config
export default defineConfig({
  site: SITE,
  redirects,
  integrations: [
    starlight({
      title: 'UQ XNAT',
      description:
        'Storing, managing and analysing de-identified imaging data for UQ projects and collaborators',
      locales: { root: { label: 'English', lang: 'en-AU' } },
      customCss: [
        '../../shared/styles/theme.css',
        './src/styles/tokens.css',
        './src/styles/base.css',
        '../../shared/styles/navbar.css',
        './src/styles/components.css',
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      editLink: { baseUrl: 'https://github.com/UQ-RCC/platform-docs/edit/main/sites/xnat/' },
      // Reads git commit times, so CI needs full history (fetch-depth: 0).
      lastUpdated: true,
      favicon: '/favicon.svg',
      head: [
        // Starlight sets twitter:card=summary_large_image but emits no
        // og:image. Scrapers will not resolve a relative image URL.
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}/og-default.png` } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: 'UQ XNAT - imaging data documentation',
          },
        },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}/og-default.png` } },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#51247A' } },
      ],
      components: {
        // Replace the header's social-icons slot with our top-nav links.
        SocialIcons: './src/components/NavLinks.astro',
        // Cycling theme toggle (auto → light → dark) instead of the dropdown.
        ThemeSelect: '../../shared/components/ThemeSelect.astro',
        // Wraps the built-in footer to add RCC / NIF / AIS attribution.
        Footer: './src/components/Footer.astro',
      },
      // Single axis: every group is a task, ordered the way a new user meets
      // them. Labels are free to change; slugs are not, since the legacy
      // redirects point at them.
      sidebar: [
        // Hub page of task-shaped links, also the homepage's "Docs" target.
        { label: 'All guides', slug: 'user-guides' },
        {
          label: 'Getting started',
          items: [
            // Tabbed by member type; covers requesting a project and an account.
            { label: 'Signing up', slug: 'user-guides/getting-started' },
            { label: 'Logging in', slug: 'user-guides/logging-into-xnat' },
            {
              label: 'Your project',
              slug: 'user-guides/using-xnat/projects/your-project',
            },
          ],
        },
        {
          label: 'Uploading and downloading',
          items: [
            {
              label: 'Overview',
              slug: 'user-guides/managing-data/uploading-data',
            },
            {
              label: 'Upload from the browser',
              slug: 'user-guides/managing-data/uploading-data/web-upload',
            },
            {
              label: 'Fixing stuck uploads',
              slug: 'user-guides/managing-data/uploading-data/prearchive',
            },
            {
              label: 'Custom upload forms',
              slug: 'user-guides/managing-data/uploading-data/resource-uploader',
            },
            { label: 'Downloading data', slug: 'user-guides/managing-data/downloading-data' },
            {
              label: 'Syncing between XNATs',
              slug: 'user-guides/managing-data/syncing-data',
            },
          ],
        },
        {
          label: 'Browsing and organising',
          items: [
            { label: 'Overview', slug: 'user-guides/using-xnat' },
            {
              label: 'Projects',
              items: [
                { label: 'Overview', slug: 'user-guides/using-xnat/projects' },
                {
                  label: 'Granting access',
                  slug: 'user-guides/using-xnat/projects/granting-access',
                },
                {
                  label: 'Requesting more storage',
                  slug: 'user-guides/using-xnat/projects/request-storage',
                },
              ],
            },
            { label: 'Subjects', slug: 'user-guides/using-xnat/subjects' },
            { label: 'Sessions and scans', slug: 'user-guides/using-xnat/sessions' },
            { label: 'Viewing images', slug: 'user-guides/managing-data/viewing-images' },
            { label: 'Search', slug: 'user-guides/using-xnat/search' },
          ],
        },
        {
          label: 'Anonymising data',
          items: [
            { label: 'Overview', slug: 'user-guides/managing-data/anonymising-data' },
            {
              label: 'On-site anonymisation',
              slug: 'user-guides/managing-data/anonymising-data/site-anonymiser',
            },
            {
              label: 'Project anonymiser',
              slug: 'user-guides/managing-data/anonymising-data/project-anonymiser',
            },
          ],
        },
        {
          // Plugins layered on top of XNAT, rather than core platform features.
          label: 'Analysis and pipelines',
          items: [
            {
              label: 'Jupyter environment',
              slug: 'user-guides/processing-data/interactive-analysis',
            },
          ],
        },
        {
          label: 'Command line access',
          items: [
            { label: 'Overview', slug: 'user-guides/processing-data' },
            { label: 'Alias tokens', slug: 'user-guides/processing-data/alias-tokens' },
            { label: 'Command line tools', slug: 'user-guides/processing-data/command-line-tools' },
          ],
        },
      ],
    }),
  ],
});
