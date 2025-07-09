// src/shadcn-generator.js
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export async function generateShadcn(config) {
  const outDir = path.join(process.cwd(), "shadcn");
  await fs.ensureDir(outDir);
  const readme = `
# 🧩 ShadCN/UI Setup Instructions

1. Install required packages (React + Tailwind must be installed):

\`\`\`bash
npx shadcn-ui@latest init
\`\`\`

Choose:
- **TailwindCSS** (already installed if you generated it via this CLI)
- Customize your path (e.g., \`components/ui\`)

2. Use components like this:

\`\`\`jsx
import { Button } from "@/components/ui/button"

<Button className="bg-primary text-white">Click me</Button>
\`\`\`

You can customize all components inside \`/components/ui/\` and they’ll respect your Tailwind theme.
`;

  await fs.writeFile(path.join(process.cwd(), "SHADCN.md"), readme);
  console.log(chalk.green("✔ ShadCN setup guide created"));
}
