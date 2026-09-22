const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // SVG text fill doesn't always resolve CSS variables correctly in Recharts
            content = content.replace(/fill: 'var\(--muted-foreground\)'/g, "fill: '#94a3b8'");
            content = content.replace(/fill="var\(--muted-foreground\)"/g, 'fill="#94a3b8"');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed ' + fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('Done');
