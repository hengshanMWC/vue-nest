module.exports = {
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 使用type导入会导致nest依赖解析出问题 https://github.com/nestjs/nest/issues/12604
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'no-type-imports',
      },
    ],
  },
}
