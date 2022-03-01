module.exports = {
  root: true,
  env: {
    node: true
  },
  ignorePatterns: [
    // This file has lots of @typescript-eslint/no-loss-of-precision errors, 
    // but doesn't seem to be used by the application at all.
    "src/layers/TestRegions.ts"
  ],
  plugins: [
    "jsdoc"
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    "plugin:jsdoc/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // note you must disable the base rule as it can report incorrect errors
    // See https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision": ["error"],
    "jsdoc/require-jsdoc": [1,
      {
        publicOnly: {
          ancestorsOnly: false, // - Only check node ancestors to check if node is exported (Defaults to false)
          esm: true, // - ESM exports are checked for JSDoc comments (Defaults to true)
          cjs: true, // - CommonJS exports are checked for JSDoc comments (Defaults to true)
          window: true // - Window global exports are checked for JSDoc comments (Defaults to false)
        },
        require: {
          // All default to false unless otherwise noted.
          ArrowFunctionExpression: true,
          ClassDeclaration: false ,
          ClassExpression: false,
          FunctionDeclaration: true, // (defaults to true)
          FunctionExpression: false,
          MethodDefinition: false,
        }
      }
    ],
    // Turn of type requirements in jsdoc, since code is in TypeScript which already specifies types.
    // "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}], // Turn this on if you want to forbid types.
    "jsdoc/require-param-type": 0,
    "jsdoc/require-return-type": 0,
    "jsdoc/require-returns-type": 0,
  }
}
