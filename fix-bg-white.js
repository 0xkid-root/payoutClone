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

            // Remove bg-white since we are migrating to dark theme and it's conflicting.
            content = content.replace(/\bbg-white\b/g, (match) => {
                return ''; // Remove bg-white everywhere
            });
            
            // Clean up double spaces that might be left by removal
            content = content.replace(/  +/g, ' ');
            
            // Clean up className=" " to className=""
            content = content.replace(/className="\s+"/g, 'className=""');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed ' + fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('Done');
