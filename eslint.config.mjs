import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

const eslintConfig = [
  ...tseslint.configs.recommended,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-invalid-void-type": "error",
      "@typescript-eslint/no-meaningless-void-operator": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "typeLike", format: ["PascalCase"], filter: { regex: "^(__String|[A-Za-z]+_[A-Za-z]+)$", match: false } },
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: { regex: "^I[A-Z]", match: false },
          filter: { regex: "^I(Arguments|TextWriter|O([A-Z][a-z]+[A-Za-z]*)?)$", match: false },
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          filter: { regex: "^(_{1,2}filename|_{1,2}dirname|_+|[A-Za-z]+_[A-Za-z]+)$", match: false },
        },
        { selector: "function", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false } },
        { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow", filter: { regex: "^(_+|[A-Za-z]+_[A-Z][a-z]+)$", match: false } },
        { selector: "method", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^([0-9]+|[A-Za-z]+_[A-Za-z]+)$", match: false } },
        { selector: "enumMember", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow", filter: { regex: "^[A-Za-z]+_[A-Za-z]+$", match: false } },
      ],
    },
  },
];
export default eslintConfig;
