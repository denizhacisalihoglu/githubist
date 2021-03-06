module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['react', 'react-native', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': ['error', { allow: ['__APOLLO_STATE__'] }],
    'arrow-body-style': 'warn',
    'no-use-before-define': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
};
