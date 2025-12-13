module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Allow Mongo's _id field
    "no-underscore-dangle": ["error", { allow: ["_id"] }],

    // ✅ Allow console.log / console.error (common in backend)
    "no-console": "off",

    // ✅ Ignore unused args that start with _
    // This fixes '_next is defined but never used'
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
