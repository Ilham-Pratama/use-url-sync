/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import qs from 'qs';

interface UseUriStateInterface<T> {
  name: string;
  defaultValue: T;
  onExists?: (parsedValue: any) => T;
}

type UseUriStateReturnInterface<T> = [
  T,
  (value: T | ((prevValue: T) => T)) => void
];

function useUrlState<T extends any>({
  name,
  defaultValue,
  onExists
}: UseUriStateInterface<T>): UseUriStateReturnInterface<T> {
  return useState<T>(() => {
    const { search } = window.location;
    const initialState = qs.parse(search, { ignoreQueryPrefix: true });
    const urlValue = initialState[name];
    if (!urlValue) return defaultValue;
    return onExists ? onExists(urlValue) : (urlValue as T);
  });
}

export default useUrlState;
