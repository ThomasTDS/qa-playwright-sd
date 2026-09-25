const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPlaywright = require('eslint-plugin-playwright');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'reports', 'build'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['pages/**/*.ts', 'steps/**/*.ts'],
    ...eslintPluginPlaywright.configs['flat/recommended'],
    rules: {
      ...eslintPluginPlaywright.configs['flat/recommended'].rules,
      'playwright/no-wait-for-timeout': 'error',
    },
  },
  eslintConfigPrettier
);
