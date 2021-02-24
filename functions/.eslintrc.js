module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'quotes': ['warn', 'single'],
    'quote-props': ['error', 'consistent-as-needed'],
    'object-curly-spacing': 0,
  },
};
