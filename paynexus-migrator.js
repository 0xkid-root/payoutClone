const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.match(/\.(tsx|ts|jsx|js)$/)) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(srcDir);
let totalReplaced = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // 1. Direct hex replacements
  content = content.replace(/bg-\[\#06111F\]|bg-\[\#0B1220\]/gi, 'bg-background');
  content = content.replace(/bg-\[\#0D1B2D\]|bg-\[\#111C2E\]/gi, 'bg-card');
  content = content.replace(/bg-\[\#132A40\]/gi, 'bg-accent');
  content = content.replace(/border-\[\#183B58\]/gi, 'border-border');
  content = content.replace(/text-\[\#F8FAFC\]/gi, 'text-foreground');
  content = content.replace(/text-\[\#94A3B8\]/gi, 'text-muted-foreground');
  content = content.replace(/text-\[\#CBD5E1\]/gi, 'text-secondary-foreground');
  content = content.replace(/bg-\[\#14B8A6\]/gi, 'bg-primary');
  content = content.replace(/text-\[\#14B8A6\]/gi, 'text-primary');

  // 2. Old AtMoonPe Colors (Indigo/Purple/Slate)
  // Indigo background variations to primary or muted depending on context
  // Usually bg-indigo-50 was used for light mode hover or accents. We'll map to bg-primary/10
  content = content.replace(/bg-indigo-50\/50/gi, 'bg-primary/5');
  content = content.replace(/bg-indigo-50/gi, 'bg-primary/10');
  content = content.replace(/bg-indigo-100/gi, 'bg-primary/20');
  content = content.replace(/bg-indigo-500|bg-indigo-600/gi, 'bg-primary');
  content = content.replace(/bg-indigo-900\/20|bg-indigo-900\/30|bg-indigo-900\/50/gi, 'bg-primary/10');
  
  // Indigo text variations
  content = content.replace(/text-indigo-400|text-indigo-500|text-indigo-600|text-indigo-700/gi, 'text-primary');
  content = content.replace(/text-indigo-300|text-indigo-200/gi, 'text-primary');
  
  // Indigo borders
  content = content.replace(/border-indigo-100|border-indigo-200|border-indigo-200\/50|border-indigo-500/gi, 'border-primary/20');
  content = content.replace(/border-indigo-900\/30|border-indigo-900\/50/gi, 'border-primary/20');

  // Purple replacements
  content = content.replace(/bg-purple-500|bg-purple-600/gi, 'bg-primary');
  content = content.replace(/text-purple-500|text-purple-600/gi, 'text-primary');

  // 3. Status Semantic Colors (Success, Pending, Failed, Info)
  // Emerald / Green -> Success
  content = content.replace(/text-emerald-600|text-emerald-500|text-green-600/gi, 'text-success');
  content = content.replace(/bg-emerald-50|bg-emerald-500\/10/gi, 'bg-success/10');
  content = content.replace(/border-emerald-200\/50|border-emerald-200/gi, 'border-success/30');

  // Amber / Yellow -> Warning (Pending)
  content = content.replace(/text-amber-600|text-amber-500|text-yellow-600/gi, 'text-warning');
  content = content.replace(/bg-amber-50|bg-amber-500\/10/gi, 'bg-warning/10');
  content = content.replace(/border-amber-200\/50|border-amber-200/gi, 'border-warning/30');

  // Red -> Danger (Failed)
  content = content.replace(/text-red-600|text-red-500|text-red-700/gi, 'text-danger');
  content = content.replace(/bg-red-50|bg-red-500\/10/gi, 'bg-danger/10');
  content = content.replace(/border-red-200\/50|border-red-200/gi, 'border-danger/30');

  // Blue / Sky -> Info
  content = content.replace(/text-blue-600|text-sky-500|text-sky-600/gi, 'text-info');
  content = content.replace(/bg-blue-50|bg-sky-50|bg-sky-500\/10/gi, 'bg-info/10');
  content = content.replace(/border-blue-200\/50|border-sky-200/gi, 'border-info/30');

  // 4. Slate / Gray Replacements
  // Cards / Backgrounds
  content = content.replace(/bg-slate-50\/50|bg-slate-50/gi, 'bg-background');
  content = content.replace(/bg-slate-100|bg-slate-800\/50/gi, 'bg-muted');
  content = content.replace(/bg-slate-800|bg-slate-900/gi, 'bg-card');
  
  // Borders
  content = content.replace(/border-slate-100\/60|border-slate-100/gi, 'border-border');
  content = content.replace(/border-slate-200|border-slate-300|border-slate-800/gi, 'border-border');
  
  // Texts
  content = content.replace(/text-slate-400|text-slate-500|text-slate-600/gi, 'text-muted-foreground');
  content = content.replace(/text-slate-700|text-slate-800|text-slate-900/gi, 'text-foreground');
  content = content.replace(/text-slate-300|text-slate-200|text-slate-100|text-slate-50/gi, 'text-foreground');

  // 5. Sidebar Specifics (if file is a sidebar)
  const isSidebar = file.includes('sidebar') || file.includes('admin-layout') || file.includes('AppShell');
  if (isSidebar) {
    content = content.replace(/bg-background/g, 'bg-sidebar');
    content = content.replace(/bg-card/g, 'bg-sidebar');
    content = content.replace(/text-foreground/g, 'text-sidebar-foreground');
    content = content.replace(/border-border/g, 'border-sidebar-border');
  }

  // 6. Cleanup redundant multiple dark: prefixes that were converted
  content = content.replace(/dark:bg-card/g, 'bg-card');
  content = content.replace(/dark:bg-background/g, 'bg-background');
  content = content.replace(/dark:text-muted-foreground/g, 'text-muted-foreground');
  content = content.replace(/dark:text-foreground/g, 'text-foreground');
  content = content.replace(/dark:border-border/g, 'border-border');
  
  // Fix double bg-bg, border-border-border mistakes from consecutive replacements
  content = content.replace(/bg-background bg-background/g, 'bg-background');
  content = content.replace(/border-border border-border/g, 'border-border');
  content = content.replace(/text-muted-foreground text-muted-foreground/g, 'text-muted-foreground');
  content = content.replace(/text-foreground text-foreground/g, 'text-foreground');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplaced++;
  }
});

console.log(`Migration complete. Modified ${totalReplaced} files.`);
