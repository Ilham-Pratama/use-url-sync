/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const isStateValid = (stateValue: any, ignore: any): boolean => {
  if (typeof ignore === 'function') {
    return !ignore(stateValue);
  }
  const stringifiedValue1 = JSON.stringify(stateValue);
  const stringifiedValue2 = JSON.stringify(ignore);
  return stateValue === ignore || stringifiedValue1 === stringifiedValue2;
};

export default isStateValid;
