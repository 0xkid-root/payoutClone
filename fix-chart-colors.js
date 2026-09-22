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

            // Fix invalid HSL syntax because our variables are HEX
            content = content.replace(/hsl\(var\(--muted-foreground\)\)/g, 'var(--muted-foreground)');
            
            // Fix hardcoded chart colors for dark theme
            content = content.replace(/stroke="#e2e8f0"/g, 'stroke="var(--border)"');
            content = content.replace(/border: '1px solid #e2e8f0'/g, "border: '1px solid var(--border)'");
            
            // For tooltips that might be missing background/foreground colors
            // e.g. contentStyle={{ borderRadius: '8px', ... }}
            content = content.replace(/contentStyle=\{\{\s*borderRadius:/g, "contentStyle={{ backgroundColor: 'var(--card)', color: 'var(--foreground)', borderRadius:");

            // And maybe some other charts have different tooltip styles, let's catch just {{ without borderRadius if there's no background
            // Actually, the above should catch the ones in the screenshot

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed ' + fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('Done');
