module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  extends: [
    'plugin:jest/recommended',
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],

  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': [
    //   'warn',
    //   {
    //     allowArgumentsExplicitlyTypedAsAny: true,
    //   },
    // ],
    'class-methods-use-this': 'off',
    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: [
          'expect*',

          // Нужно для supertest (при import request from 'supertest')
          'request.**.expect',
        ],
      },
    ],
    'jest/lowercase-name': 'error',
    'jest/no-standalone-expect': [
      'error',
      { additionalTestBlockFunctions: ['each.test'] },
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/__mocks__/**/*.ts',
          '**/*.test.ts',
          '**/*.e2e-test.ts',
          '**/test/**/*.ts',
          '**/tools/**/*.ts',
        ],
      },
    ],
    'lines-between-class-members': 'off',
    'no-console': 'warn',
    'no-empty': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',

    // Переопределено @typescript-eslint/no-shadow
    'no-shadow': 'off',

    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        allow: [
          // Используем для настройки mock-а модуля
          '__mock',
        ],
      },
    ],
    'no-use-before-define': 'off',

    // Переопределено @typescript-eslint/no-useless-constructor
    'no-useless-constructor': 'off',

    'no-void': 'off',

    'func-names': 'warn',
    '@typescript-eslint/ban-types': 'warn',

    // в пакетах тмс не ресолвятся модули которые воркспейс закидвает наверх
    // удалить после мерджа с тмс
    'import/no-unresolved': 'warn',

    // правило из МП
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'import/no-unresolved': 'warn',

    'import/no-cycle': 'off',
  },
};
