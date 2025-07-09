// src/mui-generator.js
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function generateMuiThemeFiles(config) {
  const { language, primaryColor, fontFamily, fontSize } = config;
  const ext = language === 'TypeScript' ? 'ts' : 'js';

  const outDir = path.join(process.cwd(), 'theme');
  await fs.ensureDir(outDir);

  // 1. palette
  const palette = `
// theme/palette.${ext}
const palette = {
  primary: {
    main: '${primaryColor}',
  },
  secondary: {
    main: '#1976d2',
  },
  error: {
    main: '#f44336',
  },
};

export default palette;
`;

  // 2. typography
  const typography = `
// theme/typography.${ext}
const typography = {
  fontFamily: ${JSON.stringify(fontFamily)},
  fontSize: ${fontSize},
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
};

export default typography;
`;

  // 3. spacing
  const spacing = `
// theme/spacing.${ext}
const spacing = 8; // 8px spacing unit

export default spacing;
`;

  // 4. shadows
  const shadows = `
// theme/shadows.${ext}
const shadows = [
  'none',
  '0px 1px 3px rgba(0,0,0,0.2)',
  '0px 1px 5px rgba(0,0,0,0.3)',
  // ...add more as needed
];

export default shadows;
`;

  // 5. light & dark tokens
  const designTokens = `
// theme/getDesignTokens.${ext}
import palette from './palette.${ext}';
import typography from './typography.${ext}';
import spacing from './spacing.${ext}';
import shadows from './shadows.${ext}';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...palette,
  },
  typography,
  spacing,
  shadows,
});

export default getDesignTokens;
`;

  // 6. theme.ts
  const themeSetup = `
// theme/theme.${ext}
import { createTheme } from '@mui/material/styles';
import getDesignTokens from './getDesignTokens.${ext}';

const theme = (mode = 'light') => createTheme(getDesignTokens(mode));

export default theme;
`;

  // 7. mode context
  const contextCode = `
// theme/ModeContext.tsx
"use client";
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({ toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')) }),
    []
  );

  const appliedTheme = useMemo(() => theme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
`;

  const files = [
    { name: 'palette', code: palette },
    { name: 'typography', code: typography },
    { name: 'spacing', code: spacing },
    { name: 'shadows', code: shadows },
    { name: 'getDesignTokens', code: designTokens },
    { name: 'theme', code: themeSetup },
  ];

  for (const file of files) {
    const filePath = path.join(outDir, `${file.name}.${ext}`);
    await fs.writeFile(filePath, file.code);
    console.log(chalk.green(`✔ ${file.name}.${ext} created`));
  }

  // Always write context in TS (for MUI projects it's universal)
  await fs.writeFile(path.join(outDir, 'ModeContext.tsx'), contextCode);
  console.log(chalk.green('✔ ModeContext.tsx created'));
}
