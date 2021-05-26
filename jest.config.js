/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  preset: 'ts-jest',
  testLocationInResults: true,
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testURL: 'https://example.com/user?name=andy&experience=1&isEmployee=false',
  verbose: true
};
