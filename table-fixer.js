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

  // Fix messed up bg-white replacements
  content = content.replace(/bg-white shadow-sm bg-background/g, 'bg-card shadow-sm');
  content = content.replace(/bg-white bg-background/g, 'bg-card');
  content = content.replace(/bg-white dark:bg-slate-950/g, 'bg-card');
  content = content.replace(/bg-white dark:bg-card/g, 'bg-card');
  content = content.replace(/bg-white/g, 'bg-card');
  
  // Clean up double bg-card
  content = content.replace(/bg-card bg-card/g, 'bg-card');

  // Fix Tables
  // Table headers usually have bg-slate-50 or bg-gray-50 or bg-muted
  // We need to make them #10243A. We can add a custom utility to tailwind or just use a custom class, but wait, globals.css has `--muted: #142438`. The requested Table header is `#10243A`.
  // Let's replace TableHeader classes that use bg-muted or bg-slate-50 with a specific table header class or inline bg-[#10243A]
  content = content.replace(/bg-muted\/50/g, 'bg-[#10243A]');
  content = content.replace(/bg-muted/g, 'bg-[#10243A]');
  content = content.replace(/bg-card\/50/g, 'bg-[#10243A]');
  
  // Table Row hover
  content = content.replace(/hover:bg-muted\/50/g, 'hover:bg-[#102438]');
  content = content.replace(/hover:bg-muted/g, 'hover:bg-[#102438]');
  content = content.replace(/hover:bg-slate-50\/50/g, 'hover:bg-[#102438]');
  content = content.replace(/hover:bg-slate-50/g, 'hover:bg-[#102438]');
  content = content.replace(/hover:bg-transparent/g, 'hover:bg-[#102438]');
  
  // Row Border
  // #183047
  content = content.replace(/border-b border-border/g, 'border-b border-[#183047]');
  content = content.replace(/border-border\/50/g, 'border-[#183047]');
  content = content.replace(/border-border\/60/g, 'border-[#183047]');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplaced++;
  }
});

console.log(`Table fix complete. Modified ${totalReplaced} files.`);
