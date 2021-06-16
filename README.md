# use-url-sync

![npm](https://img.shields.io/npm/v/use-url-sync) ![CI](https://github.com/Ilham-Pratama/use-url-sync/actions/workflows/main-ci.yml/badge.svg) ![minizip](https://badgen.net/bundlephobia/minzip/use-url-sync)

**use-url-sync** is a set of tools that help you sync your state to URL.
Along with this package, you can do some awesome stuff, such as:

- Use state hook `useUrlState` to get value from current page path
- Sync your states's values to path using `useUrlSync` or `getUrlString`

## 🖥️ Example

Current path: `/user?name=andy&page=1&isEmployee=false`

```jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSyncUrl, useUrlState } from 'use-url-sync';

const App = () => {
  const location = useLocation();

  /* Retrieve value from URL */
  const [page, setPage] = useUrlState({
    name: 'page',
    defaultValue: 0,
    onExists: p => parseInt(p, 10)
  });
  const [name, setName] = useUrlState({
    name: 'name',
    defaultValue: ''
  });
  const [isEmployee, setIsEmployee] = useUrlState({
    name: 'isEmployee',
    defaultValue: false,
    onExists: v => v === 'true'
  });

  /* Sync states to path */
  useUrlSync(
    {
      states: {
        name,
        page,
        isEmployee
      },
      /* How the states will be displayed */
      onStatesUpdated: {
        isEmployee: v => (v ? 'true' : 'false')
      },
      /* Ignored conditions */
      ignore: {
        page: p => p === 0
      }
    },
    nextPath => {
      location.replace(nextPath);
    }
  );

  const incrementPage = () => setPage(p => p + 1);

  const decrementPage = () => setPage(p => p - 1);

  const toggleEmployeeStatus = () => {
    setIsEmployee(v => !v);
  };

  return (
    <>
      <div id="page-togglers">
        <button type="button" id="increase-page" onClick={incrementPage}>
          + 1
        </button>
        <button type="button" id="decrease-page" onClick={decrementPage}>
          - 1
        </button>
      </div>
      <button type="button" id="toggle-status" onClick={toggleEmployeeStatus}>
        Toggle Employee Status
      </button>
      <p id="current-page">{page}</p>
      <p id="current-name">{name}</p>
      <p id="current-isEmployee">{isEmployee ? 'true' : 'false'}</p>
    </>
  );
};
```

## 💾 Installation

```sh
npm install use-url-sync
```

or

```sh
yarn add use-url-sync
```

## ✔️ TypeScript Support

This package contains an `index.d.ts` type definition file, so you can use it in TypeScript without extra configuration.

```tsx
  ...

  const [page, setPage] = useUrlState<number>({
    name: 'page',
    defaultValue: 0,
    onExists: (p: any) => parseInt(p, 10)
  });
  const [name, setName] = useUrlState<string>({
    name: 'name',
    defaultValue: ''
  });

  interface IStates {
    page: number;
    name: string;
  }

  useUrlSync<IStates>(
    {
      states: {
        page,
        name
      },
      ignore: {
        page: (p: number) => p === 0
      }
    },
    (nextPath: string) => {
      location.replace(nextPath);
    }
  );

  ...
```

## 🏷️ LICENSE

MIT License

Copyright (c) 2021 Ilham-Pratama

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
