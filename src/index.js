// src/index.js
import chalk from "chalk";
import { getUserConfig } from "./prompts.js";
import { generateMuiThemeFiles } from "./mui-generator.js";
import { generateScssFiles } from "./scss-generator.js";
import { generateTailwind } from "./tailwind-generator.js";
import { generateShadcn } from "./shadcn-generator.js";

export async function runCLI() {
  console.log(chalk.cyanBright("\n🖌️  Welcome to the Theme Generator CLI\n"));

  try {
    const config = await getUserConfig();

    if (config.includeMui) {
      await generateMuiThemeFiles(config);
    }

    if (config.includeScss) {
      await generateScssFiles(config);
    }
    if (config.includeTailwind) {
      await generateTailwind(config);
    }
    if (config.includeShadcn) {
      await generateShadcn(config);
    }

    console.log(
      chalk.greenBright(
        "\n✨ Theme setup complete! Check your project directory.\n"
      )
    );
  } catch (err) {
    console.log(chalk.red("❌ Error:"), err.message);
  }
}
