// src/prompts.js
import inquirer from "inquirer";

export async function getUserConfig() {
  return await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose your language:",
      choices: ["TypeScript", "JavaScript"],
      default: "TypeScript",
    },
    {
      type: "list",
      name: "framework",
      message: "Which framework are you using?",
      choices: ["React + Vite", "Next.js", "None"],
      default: "React + Vite",
    },
    {
      type: "confirm",
      name: "includeMui",
      message: "Do you want to generate a MUI theme?",
      default: true,
    },
    {
      type: "confirm",
      name: "includeTailwind",
      message: "Do you want to include TailwindCSS setup?",
      default: false,
    },
    {
      type: "confirm",
      name: "includeShadcn",
      message: "Do you want to include ShadCN/UI setup?",
      default: false,
    },
    {
      type: "confirm",
      name: "includeScss",
      message: "Do you want to include SCSS variables?",
      default: true,
    },
    {
      type: "input",
      name: "primaryColor",
      message: "Enter your primary color (hex):",
      default: "#DC3C22",
    },
    {
      type: "input",
      name: "fontFamily",
      message: "Enter your font family:",
      default: '"Roboto", sans-serif',
    },
    {
      type: "input",
      name: "fontSize",
      message: "Enter base font size (px):",
      default: "14",
    },
  ]);
}
