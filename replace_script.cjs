const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const configPath = path.join(srcDir, 'config.js');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        if (f === 'node_modules' || f === '.git') return;
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir(srcDir, (filePath) => {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
    if (filePath === configPath) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const relPath = path.relative(path.dirname(filePath), configPath).replace(/\\/g, '/');
    const importPath = relPath.startsWith('.') ? relPath : './' + relPath;
    const importPathWithoutExt = importPath.replace(/\.js$/, '');

    // Replace basic API_BASE_URL const
    const target1 = `const API_BASE_URL = "https://api.mapman.in";`;
    if (content.includes(target1)) {
        // Find the last import statement or the beginning of the file
        content = content.replace(target1, '');
        // Add import at the top (after other imports)
        let lines = content.split('\n');
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                lastImportIndex = i;
            }
        }
        lines.splice(lastImportIndex + 1, 0, `import { API_BASE_URL } from "${importPathWithoutExt}";`);
        content = lines.join('\n');
        changed = true;
    }

    // Replace shop.js and auth.js URL base
    const target2 = `const BASE_URL = "https://api.mapman.in/shop";`;
    if (content.includes(target2)) {
        content = content.replace(target2, '');
        let lines = content.split('\n');
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                lastImportIndex = i;
            }
        }
        lines.splice(lastImportIndex + 1, 0, `import { API_BASE_URL } from "${importPathWithoutExt}";\nconst BASE_URL = \`\${API_BASE_URL}/shop\`;`);
        content = lines.join('\n');
        changed = true;
    }

    const target3 = `const BASE_URL = "https://api.mapman.in/shop/auth";`;
    if (content.includes(target3)) {
        content = content.replace(target3, '');
        let lines = content.split('\n');
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                lastImportIndex = i;
            }
        }
        lines.splice(lastImportIndex + 1, 0, `import { API_BASE_URL } from "${importPathWithoutExt}";\nconst BASE_URL = \`\${API_BASE_URL}/shop/auth\`;`);
        content = lines.join('\n');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
});
