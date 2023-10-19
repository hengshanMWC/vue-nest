/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: ['@antfu/eslint-config-vue'],
  rules: {
    'no-console': 'off',

    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
  },
}
