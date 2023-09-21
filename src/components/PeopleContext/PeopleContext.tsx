import React, { createContext } from 'react';
import { Person } from '../../types';

interface Provider {
  people: Person[];
}

type Props = {
  value: Provider;
  children: React.ReactNode;
};

export const PeopleContext = createContext<Provider>({
  people: [],
});

export const PeopleProvider: React.FC<Props> = React.memo(
  ({ value, children }) => (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  ),
);
