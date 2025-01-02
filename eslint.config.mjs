import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["tests/**/*.js"],
    plugins: { jest: pluginJest },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
];
