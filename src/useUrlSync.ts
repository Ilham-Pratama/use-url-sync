/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import qs from 'qs';

interface IUseUrlSyncProps<S> {
  states: S;
  ignore?: { [P in keyof S]?: boolean | ((value: S[P]) => boolean) };
  onStatesUpdated?: { [P in keyof S]?: (value: S[P]) => S[P] };
}

const useUrlSync = <S extends Record<string | number, string | number>>(
  { states, ignore = {}, onStatesUpdated = {} }: IUseUrlSyncProps<S>,
  onUrlGenerated: (nextPath: string) => void
): void => {
  useEffect(() => {
    const cleanedStates = {};

    Object.keys(states).forEach(key => {
      const value = states[key];
      const shouldIgnore = ignore[key] || false; // Set default to false in case undefined
      const shouldIgnoreState =
        typeof shouldIgnore === 'boolean'
          ? shouldIgnore
          : shouldIgnore(value as any);

      /* Checks for state's value validity */
      if (
        typeof ignore[key] !== 'undefined'
          ? !shouldIgnoreState
          : value !== null && value !== undefined && value !== ''
      ) {
        /* Checks if this state has a read function */
        const thisStateOnChange = onStatesUpdated[key];
        if (thisStateOnChange)
          Object.assign(cleanedStates, {
            [key]: thisStateOnChange(value as any)
          });
        else Object.assign(cleanedStates, { [key]: value });
      }
    });

    /* Parsing it to url string using 'qs' library */
    const queryUrl = qs.stringify(cleanedStates);
    const nextPath = `${window.location.pathname}?${queryUrl}`;

    typeof onUrlGenerated === 'function' && onUrlGenerated(nextPath);
  }, [ignore, onStatesUpdated, onUrlGenerated, states]);
};

export default useUrlSync;
