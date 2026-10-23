import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
const origin = 'https://local.invalid';

if (!existsSync(root)) {
  console.error(`Build output not found: ${root}\nRun npm run build first.`);
  process.exit(1);
}

const htmlFiles = [];
const visit = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }
};
visit(root);

const cache = new Map();
const html = (file) => {
  if (!cache.has(file)) cache.set(file, readFileSync(file, 'utf8'));
  return cache.get(file);
};

const pageUrl = (file) => {
  const path = relative(root, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  return `/${path.replace(/index\.html$/, '')}`;
};

const decodeAttribute = (value) =>
  value.replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&amp;', '&');

const resolveLink = (raw, source) => {
  const value = decodeAttribute(raw.trim());
  if (!value || /^(mailto|tel|javascript|data):/i.test(value)) return null;

  const url = new URL(value, `${origin}${pageUrl(source)}`);
  if (url.origin !== origin) return null;

  const pathname = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  const base = resolve(root, pathname);
  if (base !== root && !base.startsWith(`${root}${sep}`)) return { error: 'escapes dist' };

  const candidates = [base, `${base}.html`, join(base, 'index.html')];
  const target = candidates.find((file) => existsSync(file) && statSync(file).isFile());
  if (!target) return { error: 'target does not exist' };

  return { target, fragment: decodeURIComponent(url.hash.slice(1)) };
};

const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=(['"])(.*?)\\1`, 'i'));
  return match?.[2];
};

const redirectUrl = (file) => {
  for (const tag of html(file).match(/<meta\b[^>]*>/gi) ?? []) {
    if (attribute(tag, 'http-equiv')?.toLowerCase() !== 'refresh') continue;
    return attribute(tag, 'content')?.match(/^\s*\d+\s*;\s*url=(.+)$/i)?.[1] ?? null;
  }
  return null;
};

const ids = (file) =>
  new Set([...html(file).matchAll(/\bid=(['"])(.*?)\1/gi)].map((match) => match[2]));

// The Edit page link names the source file behind each built page.
const sourceFile = (file) =>
  html(file).match(/href="https:\/\/github\.com\/[^/]+\/[^/]+\/edit\/[^/]+\/([^"]+)"/)?.[1] ?? pageUrl(file);

const problems = [];
let pages = 0;
let links = 0;
let redirects = 0;

for (const source of htmlFiles) {
  const redirect = redirectUrl(source);
  if (redirect) {
    redirects += 1;
    const where = `redirect ${pageUrl(source)} (astro.config.mjs)`;
    const result = resolveLink(redirect, source);
    if (!result || result.error) {
      problems.push({ where, link: redirect, reason: 'redirect target does not exist' });
    } else if (redirectUrl(result.target)) {
      problems.push({ where, link: redirect, reason: 'redirect target is another redirect' });
    } else if (result.fragment && !ids(result.target).has(result.fragment)) {
      problems.push({ where, link: redirect, reason: 'redirect fragment does not exist' });
    }
    continue;
  }

  pages += 1;
  const where = sourceFile(source);
  for (const match of html(source).matchAll(/\bhref=(['"])(.*?)\1/gi)) {
    const raw = match[2];
    const result = resolveLink(raw, source);
    if (!result) continue;
    links += 1;
    if (result.error) {
      problems.push({ where, link: raw, reason: result.error });
    } else if (result.fragment && result.target.endsWith('.html') && !ids(result.target).has(result.fragment)) {
      problems.push({ where, link: raw, reason: 'fragment does not exist' });
    }
  }
}

console.log(`Checked ${htmlFiles.length} HTML files, ${links} internal links and ${redirects} redirects.`);

if (problems.length) {
  // A link broken on every page comes from the site config or layout, not page content.
  const key = (p) => `${p.link} (${p.reason})`;
  const pagesWith = new Map();
  for (const p of problems) pagesWith.set(key(p), (pagesWith.get(key(p)) ?? new Set()).add(p.where));
  const siteWide = new Set([...pagesWith].filter(([, w]) => pages > 1 && w.size >= pages).map(([k]) => k));

  const byFile = new Map();
  for (const p of problems) {
    if (siteWide.has(key(p))) continue;
    if (!byFile.has(p.where)) byFile.set(p.where, new Set());
    byFile.get(p.where).add(key(p));
  }

  const lines = ['', 'Broken links to fix:'];
  for (const [file, items] of [...byFile].sort()) {
    lines.push('', file, ...[...items].map((item) => `  ${item}`));
  }
  if (siteWide.size) {
    lines.push('', 'On every page (site config or layout, not page content):', ...[...siteWide].map((item) => `  ${item}`));
  }
  console.error(lines.join('\n'));
  process.exit(1);
}
