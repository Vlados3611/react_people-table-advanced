import React, {
  useMemo,
  createContext,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';

type Props = {
  children: React.ReactNode;
};

export const SearchParamsContext = createContext<SearchParams>({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
});

export const SearchParamsProvider: React.FC<Props> = React.memo(
  ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const newValue = useMemo(() => {
      return {
        searchParams,
        setSearchParams,
      };
    }, [searchParams]);

    return (
      <SearchParamsContext.Provider value={newValue}>
        {children}
      </SearchParamsContext.Provider>
    );
  },
);
