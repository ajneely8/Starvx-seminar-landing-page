// Renders every creative to PNG (and the flyer to PDF) with headless Chrome.
// Usage:  node render.mjs            (edit window.EVENT in creative.html first)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'png');
mkdirSync(out, { recursive: true });

const chrome = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find(existsSync);
if (!chrome) throw new Error('Chrome/Edge not found');

// [file name, width, height, query, deviceScale]
const JOBS = [
  // Eventbrite
  ['eventbrite-banner-2160x1080', 2160, 1080, 'c=a'],
  // Facebook (organic)
  ['facebook-event-cover-1920x1005', 1920, 1005, 'c=a'],
  ['facebook-feed-portrait-1080x1350', 1080, 1350, 'c=c'],
  ['facebook-feed-square-1080x1080', 1080, 1080, 'c=b'],
  ['facebook-story-1080x1920', 1080, 1920, 'c=a'],
  // LinkedIn (organic)
  ['linkedin-event-cover-1776x444', 1776, 444, 'c=a'],
  ['linkedin-profile-banner-1584x396', 1584, 396, 'c=a&banner=1'],
  ['linkedin-feed-1200x627', 1200, 627, 'c=a'],
  ['linkedin-square-1200x1200', 1200, 1200, 'c=c'],
  // Meta ads — concept A "Sell like a leader"
  ['meta-ad-A-square-1080x1080', 1080, 1080, 'c=a'],
  ['meta-ad-A-feed-1080x1350', 1080, 1350, 'c=a'],
  ['meta-ad-A-story-reels-1080x1920', 1080, 1920, 'c=a'],
  ['meta-ad-A-landscape-1200x628', 1200, 628, 'c=a'],
  // Meta ads — concept B "Stop chasing the close"
  ['meta-ad-B-square-1080x1080', 1080, 1080, 'c=b'],
  ['meta-ad-B-feed-1080x1350', 1080, 1350, 'c=b'],
  ['meta-ad-B-story-reels-1080x1920', 1080, 1920, 'c=b'],
  ['meta-ad-B-landscape-1200x628', 1200, 628, 'c=b'],
  // Meta ads — concept C "5 skills, 1 process"
  ['meta-ad-C-square-1080x1080', 1080, 1080, 'c=c'],
  ['meta-ad-C-feed-1080x1350', 1080, 1350, 'c=c'],
  ['meta-ad-C-story-reels-1080x1920', 1080, 1920, 'c=c'],
  // Flyers
  ['flyer-digital-1080x1350', 1080, 1350, 'c=a'],
  ['flyer-print-letter-2550x3300', 1275, 1650, 'c=a&flyer=1', 2],
];

const only = process.argv[2];
for (const [name, w, h, q, scale = 1] of JOBS) {
  if (only && !name.includes(only)) continue;
  const url = pathToFileURL(join(here, 'creative.html')).href + '?' + q;
  const file = join(out, name + '.png');
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--window-size=${w},${h}`, `--force-device-scale-factor=${scale}`,
    '--virtual-time-budget=6000', `--screenshot=${file}`, url,
  ], { stdio: 'ignore' });
  console.log('✓', name);
}

// Print-ready PDF of the letter flyer (8.5 x 11 in, no margins)
if (!only || 'flyer'.includes(only)) {
  const wrap = join(here, '_flyer-pdf.html');
  writeFileSync(wrap, `<!doctype html><style>@page{size:8.5in 11in;margin:0}html,body{margin:0}img{width:8.5in;height:11in;display:block}</style><img src="png/flyer-print-letter-2550x3300.png">`);
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--no-pdf-header-footer',
    `--print-to-pdf=${join(out, 'flyer-print-letter-8.5x11.pdf')}`, pathToFileURL(wrap).href,
  ], { stdio: 'ignore' });
  console.log('✓ flyer-print-letter-8.5x11.pdf');
}
