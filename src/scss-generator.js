// src/scss-generator.js
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function generateScssFiles(config) {
  const { primaryColor, fontFamily, fontSize } = config;
  const outDir = path.join(process.cwd(), 'scss');
  await fs.ensureDir(outDir);

  const variables = `
// scss/_variables.scss
// 🎨 Theme Variables
$primary-color: ${primaryColor};
$font-family: ${fontFamily};
$font-size-base: ${fontSize}px;
$spacing-unit: 8px;
$border-radius: 8px;

// 🔧 Color Palette
$secondary-color: #1976d2;
$error-color: #f44336;

// 💡 Add more tokens as needed
`;

  const mixins = `
// scss/_mixins.scss
// ♻️ Useful Mixins

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

  const mainScss = `
// scss/main.scss
// ⚠️ Import this in your root file (e.g., index.js or _app.js)

@import './variables';
@import './mixins';

// Global styles (optional)
body {
  font-family: $font-family;
  font-size: $font-size-base;
  margin: 0;
  padding: 0;
  background: #fafafa;
  color: #111;
}
`;

  const readme = `
# 📦 SCSS Setup Instructions

1. Import SCSS globally in your project:

**React + Vite:**

Edit \`main.jsx\` or \`index.jsx\`:
\`\`\`js
import './scss/main.scss';
\`\`\`

**Next.js:**

Enable SCSS (if not already):
\`\`\`bash
npm install sass
\`\`\`

Then edit \`pages/_app.js\`:
\`\`\`js
import '../scss/main.scss';
\`\`\`

2. You can now use:
- \`$primary-color\`, \`$spacing-unit\`, etc. in any component
- SCSS mixins like \`@include flex-center\` in your style rules

---

🧹 Optional:
Remove any file (like mixins or variables) if unused.
`;

  // Write all SCSS files
  await fs.writeFile(path.join(outDir, '_variables.scss'), variables);
  await fs.writeFile(path.join(outDir, '_mixins.scss'), mixins);
  await fs.writeFile(path.join(outDir, 'main.scss'), mainScss);
  await fs.writeFile(path.join(outDir, 'README.md'), readme);

  console.log(chalk.green('✔ SCSS variables and mixins created'));
}
