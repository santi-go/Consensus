module.exports = {
    "extends": "standard",
    "env": {
      "mocha": true,
      "webextensions": true,
      "jquery": true
    },
    "rules": {
        "no-unused-expressions": 0,
        "chai-friendly/no-unused-expressions": 2
    },
    "plugins": [
        "chai-friendly"
    ]
};
