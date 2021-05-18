/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import qs from 'qs';

type parsedType = string | number | qs.ParsedQs | string[] | qs.ParsedQs[];

interface UseUriStateInterface {
  name: string;
  defaultValue: any;
  onValueDefined: (parsedValue: parsedType) => any;
  parseToNumber: boolean;
}

type UseUriStateReturnInterface = [
  any,
  (value: any | ((prevValue: any) => any)) => void
];

function useUrlState({
  name,
  defaultValue,
  onValueDefined,
  parseToNumber
}: UseUriStateInterface): UseUriStateReturnInterface {
  return useState(() => {
    const { search } = window.location;
    const initialState = qs.parse(search, { ignoreQueryPrefix: true });
    const valueFromUrl = initialState[name];
    if (!valueFromUrl) return defaultValue;
    const parsedValue =
      parseToNumber && typeof valueFromUrl === 'string'
        ? parseInt(valueFromUrl, 10)
        : valueFromUrl;
    return onValueDefined ? onValueDefined(parsedValue) : parsedValue;
  });
}

export default useUrlState;
