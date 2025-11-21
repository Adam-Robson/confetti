import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default defineConfig([
  globalIgnores([
    'dist/**',
    'node_modules/**',
    'build/**',
    'server/env.d.ts',
    'server/__test__/*',
    'client/__test__/*'
  ])
],
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
          globalReturn: false,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'max-len': ['error', { code: 75, ignoreComments: true }],
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-trailing-spaces': 'error'
    }
  }
);

