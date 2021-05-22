/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';

const getUrlState = <S extends Record<string | number, any>>(
  states: S
): string => {
  const { pathname } = window.location;
  if (!(typeof states === 'object')) return pathname;
  const queryUrl = qs.stringify(states);
  const parsed = `${pathname}?${queryUrl}`;
  return parsed;
};

export default getUrlState;
