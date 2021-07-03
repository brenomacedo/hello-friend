// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./tests/setupTests.ts'],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
}
