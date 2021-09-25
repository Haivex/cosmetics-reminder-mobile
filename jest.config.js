/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironment: 'node',
    preset: "react-native",
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"
    ]
};