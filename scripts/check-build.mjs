import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const htmlFiles = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir,name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(dist);

const missing=[];
const refs=[];
for (const file of htmlFiles) {
  const html=fs.readFileSync(file,'utf8');
  for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    const ref=match[1].split('#')[0].split('?')[0];
    if (!ref || ref==='/' || ref.startsWith('/projects') || ref.startsWith('/about') || ref.startsWith('/contact') || ref.startsWith('/av-solutions') || ref.startsWith('/it-solutions') || ref.startsWith('/admin')) continue;
    refs.push(ref);
    let target=path.join(dist,ref);
    if (!fs.existsSync(target)) missing.push({file:path.relative(dist,file),ref});
  }
}

const about=fs.readFileSync(path.join(dist,'about/index.html'),'utf8');
const home=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const admin=fs.readFileSync(path.join(dist,'admin/index.html'),'utf8');
const assertions=[
  ['about visual board',about.includes('avit-founder-ceo-visual-board.webp')],
  ['about founder CEO copy',about.includes('Founder &amp; CEO')],
  ['about ERP section',about.includes('Advanced Software & ERP')],
  ['AI assistant on public home',home.includes('data-ai-assistant')],
  ['AI assistant omitted from admin',!admin.includes('data-ai-assistant')],
  ['contact escalation form',home.includes('Request a human follow-up')],
];
for (const [label,ok] of assertions) if (!ok) throw new Error(`Failed: ${label}`);
if (missing.length) throw new Error(`Missing local assets: ${JSON.stringify(missing.slice(0,20),null,2)}`);
console.log(`Build checks passed: ${htmlFiles.length} HTML pages, ${new Set(refs).size} local asset references, ${assertions.length} feature assertions.`);
