// src/tailwind-generator.js
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function generateTailwind(config) {
    const outDir = path.join(process.cwd(), "tailwind");
    await fs.ensureDir(outDir);

  const tailwindConfig = `
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "${config.primaryColor}"
      },
      fontFamily: {
        sans: [${JSON.stringify(config.fontFamily)}]
      },
      fontSize: {
        base: "${config.fontSize}px"
      }
    }
  },
  plugins: [],
}
`;

  const tailwindCSS = `/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

  const readme = `
# 🌬️ Tailwind Setup Instructions

1. Install Tailwind CSS:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

2. Add the generated \`tailwind.config.js\` to your root project folder.

3. Create or replace \`src/index.css\` with this content:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

4. Import it in your root:

**Vite:**
\`\`\`js
import './index.css'
\`\`\`

**Next.js:**
\`\`\`js
import '../index.css'
\`\`\`

✅ You can now use Tailwind classes and theme overrides.
`;

  await fs.writeFile(path.join(outDir, 'tailwind.config.js'), tailwindConfig);
  await fs.writeFile(path.join(outDir, 'index.css'), tailwindCSS);
  await fs.writeFile(path.join(outDir, 'TAILWIND.md'), readme);

  console.log(chalk.green('✔ Tailwind config and index.css created'));
}
