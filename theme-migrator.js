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
  const isSidebar = file.includes('sidebar') || file.includes('admin-layout') || file.includes('AppShell');

  // Primary colors
  content = content.replace(/bg-\[\#4F46C8\]|bg-indigo-600|bg-indigo-500/gi, 'bg-primary');
  content = content.replace(/text-\[\#4F46C8\]|text-indigo-600|text-indigo-500/gi, 'text-primary');
  content = content.replace(/border-\[\#4F46C8\]|border-indigo-600|border-indigo-500/gi, 'border-primary');
  content = content.replace(/ring-\[\#4F46C8\]|ring-indigo-600|ring-indigo-500/gi, 'ring-ring');
  content = content.replace(/hover:bg-\[\#4F46C8\]|hover:bg-indigo-700/gi, 'hover:bg-primary/90');
  
  // Specific Hex Replacements for Charts and inline styles
  content = content.replace(/['"]\#4F46C8['"]/gi, "'hsl(var(--primary))'");
  content = content.replace(/['"]\#1F2A44['"]/gi, isSidebar ? "'hsl(var(--sidebar))'" : "'hsl(var(--card))'");
  content = content.replace(/['"]\#2a3753['"]/gi, "'hsl(var(--card))'");
  content = content.replace(/['"]\#64748B['"]/gi, "'hsl(var(--muted-foreground))'");

  if (isSidebar) {
    // Sidebar specific
    content = content.replace(/bg-\[\#1F2A44\]|bg-slate-900|dark:bg-slate-900/gi, 'bg-sidebar');
    content = content.replace(/border-\[\#334155\]|border-slate-800|dark:border-slate-800/gi, 'border-sidebar-border');
    content = content.replace(/text-\[\#F8FAFC\]|text-slate-50|dark:text-slate-50/gi, 'text-sidebar-foreground');
    content = content.replace(/bg-\[\#334155\]|bg-slate-800|dark:bg-slate-800/gi, 'bg-sidebar-accent');
    content = content.replace(/hover:bg-\[\#334155\]|hover:bg-slate-800/gi, 'hover:bg-sidebar-accent');
  } else {
    // General App Shell / Cards
    // Usually slate-900 or 0f172a was the main background
    content = content.replace(/bg-\[\#0f172a\]|bg-slate-900|dark:bg-slate-900/gi, 'bg-background');
    // Usually 1F2A44, 2a3753, 1e293b, slate-800 was cards
    content = content.replace(/bg-\[\#1F2A44\]|bg-\[\#1e293b\]|bg-\[\#2a3753\]|bg-slate-800|dark:bg-slate-800/gi, 'bg-card');
    
    // Borders
    content = content.replace(/border-\[\#334155\]|border-\[\#243247\]|border-slate-800|dark:border-slate-800/gi, 'border-border');
    content = content.replace(/border-slate-200|border-slate-300|dark:border-slate-700/gi, 'border-border'); 
    
    // Muted text
    content = content.replace(/text-\[\#64748B\]|text-\[\#94a3b8\]|text-slate-500|text-slate-400|dark:text-slate-400/gi, 'text-muted-foreground');
    content = content.replace(/bg-slate-100|dark:bg-slate-800\/50/gi, 'bg-muted');
    
    // Normal text
    content = content.replace(/text-slate-900|dark:text-slate-50|text-\[\#F8FAFC\]/gi, 'text-foreground');
    content = content.replace(/text-slate-800|dark:text-slate-100/gi, 'text-foreground');
  }

  // Remove redundant dark: prefixes that might have resulted from semantic replacements
  // e.g., dark:bg-card -> bg-card
  content = content.replace(/dark:bg-background/g, 'bg-background');
  content = content.replace(/dark:bg-card/g, 'bg-card');
  content = content.replace(/dark:bg-sidebar/g, 'bg-sidebar');
  content = content.replace(/dark:text-muted-foreground/g, 'text-muted-foreground');
  content = content.replace(/dark:text-foreground/g, 'text-foreground');
  content = content.replace(/dark:border-border/g, 'border-border');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplaced++;
  }
});

console.log(`Refactored hardcoded colors in ${totalReplaced} files.`);
