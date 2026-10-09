import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/", ".astro/", "node_modules/", ".lighthouseci/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...(astro.configs["jsx-a11y-recommended"] ?? []),
  {
    files: ["**/*.{js,mjs,ts,astro}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs", globals: { ...globals.node } },
  },
  {
    files: ["**/*.astro"],
    rules: {
      // Lists styled with `list-style: none` lose their semantics in Safari/VoiceOver unless
      // role="list" is explicit.
      "astro/jsx-a11y/no-redundant-roles": ["error", { ul: ["list"], ol: ["list"] }],
      // Scrollable regions (the results table) must be keyboard focusable (WCAG 2.1.1).
      "astro/jsx-a11y/no-noninteractive-tabindex": ["error", { roles: ["region"] }],
    },
  },
];
