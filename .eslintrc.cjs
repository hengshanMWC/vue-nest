/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: '@antfu/eslint-config-vue',
  ignorePatterns: [
    'commitlint.config.js',
    'postcss.config.js',
    'stylelint.config.js',
    'tailwind.config.js',
    'src/locales/lang',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'curly': 'off',
    'no-new-func': 0,
    'no-fallthrough': 'off',
    'n/prefer-global/process': 'off',

    'promise/param-names': 'off',

    'jsdoc/check-alignment': 'off',

    'vue/multi-word-component-names': 'off',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/ban-types': 'off',

    '@stylistic/js/no-tabs': 'off',

    // 希望打开的
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
