const shouldIgnoreState = <T extends unknown>(
  stateValue: T,
  shouldIgnore: (val: T) => boolean
): boolean => {
  return (
    shouldIgnore(stateValue) ||
    stateValue === null ||
    stateValue === undefined ||
    stateValue === ''
  );
};

export default shouldIgnoreState;
