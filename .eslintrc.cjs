/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['@antfu/eslint-config-vue'],
  ignorePatterns: [
    'commitlint.config.js',
    'postcss.config.js',
    'tailwind.config.js',
    'src/locales/lang',
  ],
  rules: {
    'no-console': 'off',
    'curly': 'off',
    'no-new-func': 0,
    'no-fallthrough': 'off',
    'n/prefer-global/process': 'off',
    'indent': 'off',
    'brace-style': 'off',
    'max-attributes-per-line': 'off',

    'promise/param-names': 'off',

    'jsdoc/check-alignment': 'off',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/brace-style': 'off',

    'html/singleline-max-attributes': 'off',

    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],

    '@stylistic/js/no-tabs': 'off',

    // 希望打开的
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
