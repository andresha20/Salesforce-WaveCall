const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        '^lightning/actions$':
            '<rootDir>/force-app/test/jest-mocks/lightning/actions',
        '^lightning/uiRecordApi$':
        '<rootDir>/force-app/test/jest-mocks/lightning/uiRecordApi',
    
    },
    testTimeout: 10000,
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};
