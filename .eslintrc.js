module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    // add more generic rulesets here, such as:
    // "eslint:recommended",
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    // "plugin:vue/recommended" // Use this if you are using Vue.js 2.x.
  ],
  plugins: ['vue'],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-multiple-template-root': 'off',
    'prettier/prettier': 'error',
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'global-require': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'import/prefer-default-export': 'off',
    'vue/max-attributes-per-line': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'import/extensions': 'off',
    'no-return-assign': 'off',

    // vue3 很多 export 沒辦法關聯到
    'no-unused-vars': 'off',
  },
};
