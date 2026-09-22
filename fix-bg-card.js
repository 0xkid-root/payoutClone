const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // In our previous migration, bg-white was often replaced with bg-background or it was added alongside.
            // Cards, dialogs, tables should use bg-card, not bg-background.
            // Since bg-background is on body, we can safely replace bg-background with bg-card for components.
            content = content.replace(/\bbg-background\b/g, 'bg-card');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed ' + fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('Done');
