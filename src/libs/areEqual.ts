/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const areEqual = (value1: any, value2: any): boolean => {
  if (typeof value1 === 'object' || typeof value2 === 'object') {
    const stringifiedValue1 = JSON.stringify(value1);
    const stringifiedValue2 = JSON.stringify(value2);
    return stringifiedValue1 === stringifiedValue2;
  }
  return value1 === value2;
};

export default areEqual;
