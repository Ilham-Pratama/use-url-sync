import React from 'react';
import useUrlState from 'src/useUrlState';
import useUrlSync from 'src/useUrlSync';

const App = () => {
  const [id] = useUrlState<number | undefined>({
    name: 'id',
    onExists: (thisId: string) => parseInt(thisId, 10),
    defaultValue: undefined
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
        id,
        name,
        isEmployee
      },
      onStatesUpdated: {
        isEmployee: v => (v ? 'true' : 'false')
      }
    },
    path => {
      window.location.replace(path);
    }
  );

  const onToggleName = () => {
    setName((thisName: string | undefined) => {
      return thisName === 'andy' ? 'harold' : 'andy';
    });
  };

  const toggleEmployeeStatus = () => {
    setIsEmployee(v => !v);
  };

  return (
    <div>
      <button type="button" id="toggle-name" onClick={onToggleName}>
        Toggle Name
      </button>
      <button type="button" id="toggle-status" onClick={toggleEmployeeStatus}>
        Toggle Employee Status
      </button>
    </div>
  );
};
