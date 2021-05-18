/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';

interface UseSyncUrlProps<S> {
  states: S;
}

const parseStateToUrl = <S extends Record<string | number, any>>({
  states
}: UseSyncUrlProps<S>): string => {
  const { pathname } = window.location;
  if (!(typeof states === 'object')) return pathname;
  const queryUrl = qs.stringify(states);
  const parsed = `${pathname}?${queryUrl}`;
  return parsed;
};

export default parseStateToUrl;
