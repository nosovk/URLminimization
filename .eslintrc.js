module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020
    },
    "rules": {
        "no-unused-vars": [
            1,
            {
                "ignoreSiblings": true,
                "argsIgnorePattern": "res|next|^err"
            }
        ]
    }
};
