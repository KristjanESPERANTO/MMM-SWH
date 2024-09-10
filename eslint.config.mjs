import eslintPluginJs from "@eslint/js";
import eslintPluginStylistic from "@stylistic/eslint-plugin";
import globals from "globals";

const config = [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      ...eslintPluginStylistic.configs["all-flat"].plugins
    },
    rules: {
      ...eslintPluginJs.configs.all.rules,
      ...eslintPluginStylistic.configs["all-flat"].rules,
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/lines-around-comment": "off",
      "@stylistic/multiline-comment-style": "off",
      "@stylistic/multiline-ternary": "off",
      "@stylistic/object-property-newline": "off",
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "capitalized-comments": "off",
      complexity: "off",
      "consistent-this": "off",
      "default-case": "off",
      "func-style": "off",
      "init-declarations": "off",
      "line-comment-position": "off",
      "max-lines": "off",
      "max-lines-per-function": ["error", 100],
      "max-params": "off",
      "max-statements": ["error", 25],
      "multiline-comment-style": "off",
      "no-await-in-loop": "off",
      "no-inline-comments": "off",
      "no-magic-numbers": "off",
      "no-ternary": "off",
      "no-undefined": "off",
      "one-var": "off",
      "prefer-destructuring": "off",
      "sort-keys": "off",
      strict: "off"
    }
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node
      },
      sourceType: "module"
    },
    plugins: {
      ...eslintPluginStylistic.configs["all-flat"].plugins
    },
    rules: {
      ...eslintPluginJs.configs.all.rules,
      ...eslintPluginStylistic.configs["all-flat"].rules,
      "@stylistic/array-element-newline": "off",
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "no-magic-numbers": "off",
      "one-var": "off"
    }
  }
];

/*
 * Set debug to true for testing purposes.
 * Since some plugins have not yet been optimized for the flat config,
 * we will be able to optimize this file in the future. It can be helpful
 * to write the ESLint config to a file and compare it after changes.
 */
const debug = false;

if (debug === true) {
  const FileSystem = require("node:fs");
  FileSystem.writeFile("eslint-config-DEBUG.json", JSON.stringify(config, null, 2), (error) => {
    if (error) {
      throw error;
    }
  });
}

export default config;
