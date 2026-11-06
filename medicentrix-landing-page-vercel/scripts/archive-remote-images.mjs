/*
 * Optional one-time image archive, run in the extracted project folder with
 * Node 20+ and internet. Downloads owner-site visible CDN photos and rewrites
 * ONLY this project's index.html img[src] references to local files.
 * Once archived, commit the downloaded files with the website.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
const root = process.cwd();
const htmlPath = join(root, 'index.html');
let html = await readFile(htmlPath, 'utf8');
await mkdir(join(root, 'assets', 'photos'), { recursive: true });
const urls = [...new Set(Array.from(html.matchAll(/<img\b[^>]*\bsrc="(https:\/\/[^\"]+)"/g)).map(m => m[1]))];
let count = 0;
for (const [i, url] of urls.entries()) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) { console.error('Could not archive', response.status, url);continue; }
  const contentType = response.headers.get('content-type') || '';
  const ext = contentType.includes('webp') ? 'webp' : contentType.includes('png') ? 'png' : contentType.includes('jpeg') ? 'jpg' : 'bin';
  if (ext === 'bin') { console.error('Unsupported image content type',contentType,url);continue; }
  const file = `site-image-${String(i+1).padStart(2,'0')}.${ext}`;
  await writeFile(join(root,'assets','photos',file),new Uint8Array(await response.arrayBuffer()));
  html=html.split(`src="${url}"`).join(`src="/assets/photos/${file}"`);
  console.log(`Archived ${file}`); count++;
}
if (count > 0) await writeFile(htmlPath, html);
console.log(`Archived ${count} images. Review changed HTML and commit assets/photos.`);
