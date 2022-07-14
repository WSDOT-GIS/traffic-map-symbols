module.exports = {
  root: true,
  env: {
    node: true
  },
  ignorePatterns: [
  ],
  plugins: [
    "eslint-plugin-tsdoc"
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
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
    "tsdoc/syntax": "warn"
  }
}
