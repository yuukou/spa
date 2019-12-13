module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "Popper": true,
    "_": true,
    "jQuery": true,
    "vue": true,
    "axios": true,
    "console": true
  },
  "rules": {
    "no-console": "off",
  },
  "extends": [
    "eslint:recommended",
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/vue',
  ]
};