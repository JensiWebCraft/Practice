const fs = require('fs');
const path = require('path');

const files = [
    'src/App.css',
    'src/pages/company/CompanyDashboard.css',
    'src/pages/company/EditCompany.css'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Global replacements for App.css
        content = content.replace(/#8b7bfa/g, '#fbbf24');
        content = content.replace(/#a594fd/g, '#fcd34d');
        content = content.replace(/#c4b8ff/g, '#fde68a');
        content = content.replace(/#e8e4ff/g, '#fef3c7');
        content = content.replace(/#d6d0fa/g, '#fde68a');
        content = content.replace(/#7c6bff/g, '#fbbf24');
        content = content.replace(/#5a4ed4/g, '#d97706');
        content = content.replace(/#f0edff/g, '#fef3c7');
        content = content.replace(/rgba\(124, 107, 255/g, 'rgba(251, 191, 36');
        content = content.replace(/#6a5af0/g, '#f59e0b');
        content = content.replace(/#5a4ae0/g, '#d97706');

        // Global replacements for CompanyDashboard & EditCompany
        content = content.replace(/#7b5aff/g, '#fbbf24');
        content = content.replace(/#6747e6/g, '#d97706');
        content = content.replace(/#eaddff/g, '#fef3c7');
        content = content.replace(/#f6f7fb/g, '#fef9c3');
        content = content.replace(/rgba\(123, 90, 255/g, 'rgba(251, 191, 36');
        content = content.replace(/#f4f2ff/g, '#fef3c7');
        content = content.replace(/#e6e0ff/g, '#fde68a');

        // Specific class rename in CompanyDashboard.jsx/css
        content = content.replace(/\.stat-icon\.purple/g, '.stat-icon.yellow');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
