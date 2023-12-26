module.exports = {
  extends: ['@abmao/stylelint-config-vue'],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
  },
}
