module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [ 'standard-with-typescript', 'prettier', 'plugin:storybook/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
  },
}