module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
