import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';

import useUrlState from '../src/useUrlState';
import useUrlSync from '../src/useUrlSync';

const NAMES = {
  andy: 'andy',
  harold: 'harold'
};

const App = () => {
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  const [experience, setExperience] = useUrlState<number>({
    name: 'experience',
    onExists: (thisId: string) => parseInt(thisId, 10),
    defaultValue: 0
  });
  const [name, setName] = useUrlState<string>({
    name: 'name',
    defaultValue: ''
  });
  const [isEmployee, setIsEmployee] = useUrlState<boolean>({
    name: 'isEmployee',
    onExists: (v: string) => v === 'true',
    defaultValue: false
  });

  useUrlSync(
    {
      states: {
        name,
        experience,
        isEmployee
      },
      onStatesUpdated: {
        isEmployee: v => (v ? 'true' : 'false')
      },
      ignore: {
        experience: experience => experience === 0
      }
    },
    path => {
      setCurrentUrl(window.location.origin + path);
    }
  );

  const increaseExp = () => setExperience(experience => experience + 1);

  const decreaseExp = () => setExperience(experience => experience - 1);

  const onToggleName = () => {
    setName((thisName: string | undefined) => {
      return thisName === NAMES.andy ? NAMES.harold : NAMES.andy;
    });
  };

  const toggleEmployeeStatus = () => {
    setIsEmployee(v => !v);
  };

  return (
    <div>
      <div id="experience-togglers">
        <button
          type="button"
          data-testid="increase-experience"
          onClick={increaseExp}
        >
          + 1
        </button>
        <button
          type="button"
          data-testid="decrease-experience"
          onClick={decreaseExp}
        >
          - 1
        </button>
      </div>
      <button type="button" data-testid="toggle-name" onClick={onToggleName}>
        Toggle Name
      </button>
      <button
        type="button"
        data-testid="toggle-status"
        onClick={toggleEmployeeStatus}
      >
        Toggle Employee Status
      </button>
      <p data-testid="current-experience">{experience}</p>
      <p data-testid="current-name">{name}</p>
      <p data-testid="current-isEmployee">{isEmployee ? 'true' : 'false'}</p>
      <p data-testid="current-url">{currentUrl}</p>
    </div>
  );
};

test('Checks url and states after initialized', () => {
  const { getByTestId } = render(<App />);

  const currentUrl = getByTestId('current-url');
  const experience = getByTestId('current-experience');
  const name = getByTestId('current-name');
  const isEmployee = getByTestId('current-isEmployee');

  expect(currentUrl).toHaveTextContent(window.location.href);
  expect(experience).toHaveTextContent('1');
  expect(name).toHaveTextContent(NAMES.andy);
  expect(isEmployee).toHaveTextContent('false');
});

test('Should trigger url update when a state is changed', () => {
  const { getByTestId } = render(<App />);

  const toggleNameBtn = getByTestId('toggle-name');
  const toggleStatusBtn = getByTestId('toggle-status');
  const currentUrl = getByTestId('current-url');
  const name = getByTestId('current-name');
  const isEmployee = getByTestId('current-isEmployee');

  // Toggle name and match the url

  fireEvent.click(toggleNameBtn);

  expect(currentUrl).toHaveTextContent(
    `https://example.com/user?name=${NAMES.harold}&experience=1&isEmployee=false`
  );
  expect(name).toHaveTextContent(NAMES.harold);

  // Toggle employee status and match the url

  fireEvent.click(toggleStatusBtn);

  expect(currentUrl).toHaveTextContent(
    `https://example.com/user?name=${NAMES.harold}&experience=1&isEmployee=true`
  );
  expect(isEmployee).toHaveTextContent('true');

  // Toggle back name and match the url

  fireEvent.click(toggleNameBtn);

  expect(currentUrl).toHaveTextContent(
    `https://example.com/user?name=${NAMES.andy}&experience=1&isEmployee=true`
  );
  expect(name).toHaveTextContent(NAMES.andy);

  // Toggle back employee status and match the url

  fireEvent.click(toggleStatusBtn);

  expect(currentUrl).toHaveTextContent(
    `https://example.com/user?name=${NAMES.andy}&experience=1&isEmployee=false`
  );
  expect(isEmployee).toHaveTextContent('false');
});

test("State should be removed from url when the 'ignore' matches", () => {
  const { getByTestId } = render(<App />);

  const decreaseExperience = getByTestId('decrease-experience');
  const increaseExperience = getByTestId('increase-experience');
  const currentUrl = getByTestId('current-url');
  const experience = getByTestId('current-experience');

  fireEvent.click(decreaseExperience);

  expect(currentUrl).toHaveTextContent(
    'https://example.com/user?name=andy&isEmployee=false'
  );
  expect(experience).toHaveTextContent('0');

  fireEvent.click(decreaseExperience);

  expect(currentUrl).toHaveTextContent(
    'https://example.com/user?name=andy&experience=-1&isEmployee=false'
  );
  expect(experience).toHaveTextContent('-1');

  fireEvent.click(increaseExperience);
  fireEvent.click(increaseExperience);

  expect(currentUrl).toHaveTextContent(
    'https://example.com/user?name=andy&experience=1&isEmployee=false'
  );
  expect(experience).toHaveTextContent('1');
});
