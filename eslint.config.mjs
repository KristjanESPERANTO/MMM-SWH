import css from "@eslint/css";
import {defineConfig} from "eslint/config";
import globals from "globals";
import {flatConfigs as importX} from "eslint-plugin-import-x";
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.css"],
    language: "css/css",
    languageOptions: {tolerant: true},
    plugins: {css},
    extends: ["css/recommended"],
    rules: {
      "css/use-baseline": ["error", {available: "newly"}]
    }
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {js, stylistic},
    extends: [importX.recommended, "js/all", "stylistic/all"],
    rules: {
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/lines-around-comment": "off",
      "@stylistic/multiline-comment-style": "off",
      "@stylistic/multiline-ternary": "off",
      "@stylistic/no-multi-spaces": ["error", {ignoreEOLComments: true}],
      "@stylistic/object-property-newline": ["error", {allowAllPropertiesOnSameLine: true}],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "capitalized-comments": "off",
      complexity: "off",
      "consistent-this": "off",
      "default-case": "off",
      "func-style": "off",
      "import-x/no-unresolved": ["error", {ignore: ["eslint/config", "node_helper", "logger"]}],
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
    files: ["test-config.js"],
    rules: {
      "prefer-const": "off"
    }
  },
  {
    files: ["**/*.md"],
    plugins: {markdown},
    language: "markdown/gfm",
    extends: ["markdown/recommended"]
  }
]);
