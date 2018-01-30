module.exports = {
    "extends": "standard",
    "env": {
      "mocha": true,
      "webextensions": true,
      "jquery": true
    },
    "rules": {
        "no-new": 0,
        "quotes": ["off", "double"],
        "eqeqeq": "off",
        "no-eval": [0, {"allowIndirect": true}],
        "no-unused-expressions": 0,
        "no-undef": 0,
        "chai-friendly/no-unused-expressions": 2
    },
    "plugins": [
        "chai-friendly"
    ]
};
