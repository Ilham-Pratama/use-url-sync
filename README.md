# use-url-sync

![npm](https://img.shields.io/npm/v/use-url-sync) ![CI](https://github.com/Ilham-Pratama/use-url-sync/actions/workflows/main-ci.yml/badge.svg) ![minizip](https://badgen.net/bundlephobia/minzip/use-url-sync)

**use-url-sync** is a set of tools that help you sync your state to page url.
Along with this package, you can do some awesome stuff, such as:

- Use custom hook `useUrlState` to get value from url query string
- Sync your states's values to url using `useUrlSync`
- Get synced url directly from `getUrlString` function

## 🖥️ Example

```jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSyncUrl, useUrlState } from 'use-url-sync';

const App = () => {
  const location = useLocation();

  /* Getting the value from url */
  const [experience, setExperience] = useUrlState({
    /* The index to get the value from */
    name: 'experience',
    /* Optional, Return function if the value exists */
    onExists: thisId => parseInt(thisId, 10),
    /*
      Optional, Default value if the value does not exist
    */
    defaultValue: 0
  });
  const [name, setName] = useUrlState({
    name: 'name',
    defaultValue: ''
  });
  const [isEmployee, setIsEmployee] = useUrlState({
    name: 'isEmployee',
    onExists: v => v === 'true',
    defaultValue: false
  });

  useUrlSync(
    {
      /* Values those will be kept synced to url */
      states: {
        name,
        experience,
        isEmployee
      },
      /* How the states will be displayed in url */
      onStatesUpdated: {
        isEmployee: v => (v ? 'true' : 'false')
      },
      /* The states those will be skipped if the return value is 'true' */
      ignore: {
        experience: experience => experience === 0
      }
    },
    /* Updating current url */
    updatedPath => {
      /* In this example, we use 'useLocation' from react-router */
      location.replace(updatedPath);
    }
  );

  const increaseExp = () => setExperience(experience => experience + 1);

  const decreaseExp = () => setExperience(experience => experience - 1);

  const toggleEmployeeStatus = () => {
    setIsEmployee(v => !v);
  };

  return (
    <div>
      <div id="experience-togglers">
        <button type="button" id="increase-experience" onClick={increaseExp}>
          + 1
        </button>
        <button type="button" id="decrease-experience" onClick={decreaseExp}>
          - 1
        </button>
      </div>
      <button type="button" id="toggle-status" onClick={toggleEmployeeStatus}>
        Toggle Employee Status
      </button>
      <p id="current-experience">{experience}</p>
      <p id="current-name">{name}</p>
      <p id="current-isEmployee">{isEmployee ? 'true' : 'false'}</p>
    </div>
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
