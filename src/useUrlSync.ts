/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import qs from 'qs';
import isStateValid from './libs/isStateValid';

interface UseUrlSyncProps<S> {
  states: S;
  ignore?: { [P in keyof S]?: S[P] | ((s: S[P]) => any) };
  onStatesUpdated?: { [P in keyof S]?: (s: S[P]) => any };
}

const useUrlSync = <S extends Record<string | number, any>>(
  { states, ignore = {}, onStatesUpdated = {} }: UseUrlSyncProps<S>,
  onUrlGenerated: (nextPath: string) => void
): void => {
  useEffect(() => {
    const cleanedStates = {};

    Object.keys(states).forEach(key => {
      const value = states[key];

      // Checks state's value validity
      // 'ignore' object may possibly be undefined
      if (
        (ignore.hasOwnProperty(key) && isStateValid(value, ignore[key])) ||
        typeof value === 'number' ||
        Boolean(value)
      ) {
        // Checks if this state has a read function
        const thisStateOnChange = onStatesUpdated[key];
        if (typeof thisStateOnChange === 'function') {
          const finalValue = thisStateOnChange(value);
          Object.assign(cleanedStates, { [key]: finalValue });
        } else Object.assign(cleanedStates, { [key]: value });
      }
    });

    // Parsing it to url string using 'qs' library
    const queryUrl = qs.stringify(cleanedStates);
    const nextPath = `${window.location.pathname}?${queryUrl}`;

    typeof onUrlGenerated === 'function' && onUrlGenerated(nextPath);
  }, [states]);
};

export default useUrlSync;
