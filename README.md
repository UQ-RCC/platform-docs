Documentation for UQ Research Computing Centre (RCC) platforms, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

# Sites and preview links

| Site | Folder | Production | Site preview |
| --- | --- | --- | --- |
| XNAT | `sites/xnat` | https://docs.xnat.rcc.uq.edu.au | https://uq-rcc-xnat.pages.dev |
| Pitschi | `sites/pitschi` | https://docs.pitschi.rcc.uq.edu.au | https://uq-rcc-pitschi.pages.dev |
| HPC | `sites/hpc` | https://docs.hpc.rcc.uq.edu.au | https://uq-rcc-hpc.pages.dev |
| REDCap | `sites/redcap` | https://docs.redcap.rcc.uq.edu.au | https://uq-rcc-redcap.pages.dev |

> [!NOTE]
> Site previews always show the latest version of `main`. Production only changes when someone runs **Promote to production**.

# Editing a page using GitHub

> [!NOTE]
> If you do not have write access to this repository, GitHub automatically asks you to fork it first, and your change gets submitted as a pull request.

1. Go to the page on its [site preview](#sites-and-preview-links) and select **Edit page** at the bottom. GitHub opens the page's source file in its editor.
2. Make your changes. Use the **Preview** tab to check the formatting.
3. Select **Commit changes**, add a short message, and choose **Commit directly to the `main` branch**. The site preview updates in 1 to 2 minutes. The live site only changes when someone runs **Promote to production**.

To have a change reviewed before it reaches `main`, see [Site development with branches and pull requests](#site-development-with-branches-and-pull-requests).

Every page starts with a frontmatter block like this:

```md
---
title: Page title
---

The page content starts here.
```

Keep this block when you edit a page. A page without a `title` stops the whole site from building.

# Site development with branches and pull requests

To review a change before it reaches `main`, choose **Create a new branch for this commit and start a pull request** when you commit, then open the pull request.

- The pull request builds a branch preview at `https://<branch>.uq-rcc-<site>.pages.dev`, where `<branch>` is the branch name in lower case.
- A panel at the top of the pull request description shows the build's progress, then links to the branch preview and to a preview of that exact commit.
- Every further push to the branch updates the branch preview and the panel.
- Merging the pull request brings the change into `main` and updates the site preview. Production still only changes when someone runs **Promote to production**.

To get a branch preview without a pull request, run the **Preview** workflow for it from the **Actions** tab.

# Running the sites locally

Install once from the repository root, then run Astro from the site's folder:

```
npm install
cd sites/<site>
npx astro dev          # start the site at http://localhost:4321
npx astro build        # build the site to dist/
npx astro check        # type-check the site
npx astro preview      # preview the production build
node ../../.github/scripts/check-links.mjs dist   # check internal links and redirects
```

The dev server keeps running in the background after the command returns. Stop it with `npx astro dev stop` from the same folder. The `npm run` scripts in the root `package.json` run the XNAT site.

# Repository structure

<pre>
<a href="sites">sites/</a>
├── <a href="sites/xnat">xnat/</a>
│   ├── <a href="sites/xnat/astro.config.mjs">astro.config.mjs</a>     site config, sidebar and legacy redirects
│   ├── <a href="sites/xnat/public">public/</a>              static files
│   └── <a href="sites/xnat/src">src/</a>
│       ├── <a href="sites/xnat/src/content/docs">content/docs/</a>    pages and colocated images
│       ├── <a href="sites/xnat/src/components">components/</a>      site components
│       └── <a href="sites/xnat/src/styles">styles/</a>          site styling
├── <a href="sites/pitschi">pitschi/</a>
│   ├── <a href="sites/pitschi/astro.config.mjs">astro.config.mjs</a>     site config
│   └── <a href="sites/pitschi/src">src/</a>
│       ├── <a href="sites/pitschi/src/content/docs">content/docs/</a>    pages and images
│       └── <a href="sites/pitschi/src/components">components/</a>      navbar links
└── <a href="sites/hpc">hpc/</a>
    ├── <a href="sites/hpc/astro.config.mjs">astro.config.mjs</a>     site config and sidebar
    └── <a href="sites/hpc/src/content/docs">src/content/docs/</a>    pages, with guides/ and policy/ sections
<a href="shared">shared/</a>                      navbar shared by every site
<a href=".github/workflows">.github/workflows/</a>           Build, Preview and Promote to production
<a href=".github/scripts">.github/scripts/</a>             link checker and preview panel
</pre>


# Adding new sites

> [!WARNING]
> Under construction

> [!NOTE]
> Requires repository admin access.

1. Create a DNS CNAME record for the site

   ```
   docs.<site>.rcc.uq.edu.au.
   CNAME uq-rcc.github.io.
   ```

2. Create a shell repository for the site in UQ-RCC GitHub

   | Setting                | Value                                 |
   | ---                    | ---                                   |
   | Repository name        | `docs.<site>.rcc.uq.edu.au`           |
   | Repository description | `shell repo for <site> platform-docs` |

3. Generate an SSH key pair for deploying the site

   ```
   ssh-keygen -t rsa -b 4096 -C "rcc-support@uq.edu.au"
   ```

4. Navigate to **Settings** -> **Deploy keys** and add the public key using
   `platform-docs-<site>` as the deploy key name.

5. Navigate to **Settings** -> **Secrets and variables** -> **Actions** ->
   **Repository secrets** in the **platform-docs** repository and add the private
   key using `DEPLOY_KEY_<SITE>` as the secret name.

6. Add site to the [Sites and preview links](#sites-and-preview-links) table.

7. Add a site folder. Make a copy of the [tempate](template)
   folder in [sites](sites) with the required name. Find and replace
   occurrences of 'example' (case insensitive) with the site name.

8. Add site to the [Promote to production](.github/workflows/promote.yml)
   workflow following the pattern used for other sites.

8. Push your updates then run the **Promote to production** workflow.

9. Open the shell repository and navigate to **Settings** -> **Pages**. Set **Custom
   domain** to your site DNS name and enable **Enforce HTTPS**.
