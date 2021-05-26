/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import qs from 'qs';
import shouldIgnoreState from './libs/shouldIgnoreState';

interface IUseUrlSyncProps<S> {
  states: S;
  ignore?: { [P in keyof S]?: (s: S[P]) => boolean };
  onStatesUpdated?: { [P in keyof S]?: (s: S[P]) => any };
}

const useUrlSync = <S extends Record<string | number, any>>(
  { states, ignore = {}, onStatesUpdated = {} }: IUseUrlSyncProps<S>,
  onUrlGenerated: (nextPath: string) => void
): void => {
  useEffect(() => {
    const cleanedStates = {};

    Object.keys(states).forEach(key => {
      const value = states[key];
      const ignorerFunction = ignore[key];

      /* 
        Checks for state's value validity
      */
      if (!ignorerFunction || !shouldIgnoreState(value, ignorerFunction)) {
        /* Checks if this state has a read function */
        const thisStateOnChange = onStatesUpdated[key];
        if (thisStateOnChange) {
          Object.assign(cleanedStates, { [key]: thisStateOnChange(value) });
        } else Object.assign(cleanedStates, { [key]: value });
      }
    });

    /* Parsing it to url string using 'qs' library */
    const queryUrl = qs.stringify(cleanedStates);
    const nextPath = `${window.location.pathname}?${queryUrl}`;

    typeof onUrlGenerated === 'function' && onUrlGenerated(nextPath);
  }, [states]);
};

export default useUrlSync;
