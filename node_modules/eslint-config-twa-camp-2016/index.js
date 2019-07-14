module.exports = {

    "env": {
        "es6": true,
        "node": true,
        "jasmine": true,
        "jquery": true
    },

    "parserOptions": {
        "sourceType": "module"
    },

    "plugins": ["extra-rules", "xo", "node"],

    "extends": ["eslint:recommended", "plugin:node/recommended"],

    "rules": {

        // eslint built-in rules
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"],
        "space-infix-ops": ["error"],
        // "prefer-template": ["error"],
        "max-statements": ["error", 15],
        "complexity": ["error", 8],
        "no-console": "warn",
        "handle-callback-err": "error",
        "camelcase": "error",
        "quotes": ["warn", "single", "avoid-escape"],
        "no-mixed-requires": ["error", { "grouping": true, "allowCall": false }],
        "handle-callback-err": "error",
        // "no-shadow": "error",
        "no-mixed-spaces-and-tabs": "error",
        "eqeqeq": "error",
        "prefer-const": "error",

        // from the 3rd party `eslint-rules`
        "extra-rules/no-commented-out-code": "error",

        "xo/filename-case": ["error",  {"case": "kebabCase"}]

   }
}