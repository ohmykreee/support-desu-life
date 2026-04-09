import eslintPluginAstro from "eslint-plugin-astro"
import { includeIgnoreFile } from "@eslint/compat"
import path from "node:path"
import js from "@eslint/js"
import svelte from "eslint-plugin-svelte"
import ts from "typescript-eslint"
import prettier from "eslint-config-prettier"
import svelteConfig from "./svelte.config.js"

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore")

export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  ...svelte.configs["flat/recommended"],
  ...svelte.configs["flat/prettier"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".astro"]
      }
    }
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig
      }
    }
  },
  {
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off"
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    }
  },
  prettier
]
