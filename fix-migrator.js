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

  content = content.replace(/bg-slate-200 bg-card/g, 'bg-border');
  content = content.replace(/bg-slate-200/g, 'bg-muted');
  content = content.replace(/bg-slate-300/g, 'bg-muted-foreground/30');
  content = content.replace(/bg-slate-400/g, 'bg-muted-foreground/50');
  content = content.replace(/dark:bg-slate-950\/50/g, 'bg-background/50');
  content = content.replace(/dark:bg-slate-950/g, 'bg-background');
  content = content.replace(/dark:bg-slate-700/g, 'bg-card');
  content = content.replace(/dark:bg-indigo-800/g, 'bg-primary/20');
  content = content.replace(/dark:border-slate-700/g, 'border-border');
  content = content.replace(/dark:ring-offset-slate-950/g, 'ring-offset-background');
  content = content.replace(/dark:focus:ring-slate-300|dark:focus-visible:ring-slate-300/g, 'focus-visible:ring-ring');
  content = content.replace(/focus:ring-slate-950|focus-visible:ring-slate-950/g, 'focus-visible:ring-ring');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplaced++;
  }
});

console.log(`Fix migration complete. Modified ${totalReplaced} files.`);
