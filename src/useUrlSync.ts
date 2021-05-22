/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import qs from 'qs';
import areEqual from './libs/areEqual';

interface UseUrlSyncProps<S> {
  states: S;
  onStatesUpdate: (nextPath: string) => void;
  ignoreStates?: Readonly<Partial<Record<keyof S, any>>>;
}

const useUrlSync = <S extends Record<string | number, any>>({
  states,
  onStatesUpdate,
  ignoreStates
}: UseUrlSyncProps<S>): void => {
  useEffect(() => {
    const cleanedStates: S = { ...states };

    Object.keys(states).forEach(key => {
      const value = states[key];
      if (
        ignoreStates &&
        ignoreStates[key] !== undefined &&
        !areEqual(value, ignoreStates[key])
      ) {
        delete cleanedStates[key];
      }
    });

    const queryUrl = qs.stringify(cleanedStates);
    const nextPath = `${window.location.pathname}?${queryUrl}`;
    onStatesUpdate(nextPath);
  }, [states]);
};

export default useUrlSync;
