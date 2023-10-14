/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  ignorePatterns: [
    'commitlint.config.js',
    'postcss.config.js',
    'stylelint.config.js',
    'tailwind.config.js',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  "rules": {
    "no-console": "off",
    "promise/param-names": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "curly": "off",
    "no-new-func": 0,
    // 希望打开的
    "prefer-promise-reject-errors": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
}
