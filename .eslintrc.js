module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'camelcase': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'class-methods-use-this': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-constant-condition': ['error', { checkLoops: true }],
    'no-empty-function': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForOfStatement',
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-use-before-define': ['error', { functions: false }],
    'no-useless-constructor': 'off',
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-destructuring': [
      'error',
      { array: true, object: true },
      { enforceForRenamedProperties: true },
    ],
    'spaced-comment': ['error', 'always'],
    'no-eval': ['error', { 'allowIndirect': false }],
    'import/extensions': ['error', 'always'],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'import/prefer-default-export': 'off',
  },
};
