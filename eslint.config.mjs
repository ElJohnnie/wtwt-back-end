import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';


export default [
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals['jest/globals'],
        },
        parser: tsParser,
        parserOptions: {
          ecmaVersion: 2021,
          sourceType: 'module',
        },
      },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
      plugins: {
        '@typescript-eslint': tseslint,
      },
      rules: {
      },
    },
  ];
