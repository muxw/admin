module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
      extensions: ['.ts', '.js', '.jsx', '.json', 'vue'],
    },
  },
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    createDefaultProgram: true,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: ['alloy', 'alloy/vue', 'alloy/typescript', 'prettier'],
  rules: {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    // 仅允许for循环最后使用一元运算符语法(++,--)
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-param-reassign': [0],
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: true,
      },
    ],
    'vue/attributes-order': ['off'],
  },
};
