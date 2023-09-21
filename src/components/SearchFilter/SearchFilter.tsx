import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {
  SearchParamsContext,
} from '../SearchParamsContext/SearchParamsContext';
import { getSearchWith } from '../../utils/searchHelper';

export const SearchFilter: React.FC = React.memo(
  () => {
    const { searchParams, setSearchParams } = useContext(SearchParamsContext);
    const searchQuery = searchParams.get('query') || '';
    const [query, setQuery] = useState<string>(searchQuery);

    const debounce = (
      callback: (args: string) => void,
      delay: number,
    ) => {
      let timerId: NodeJS.Timeout;

      return (args: string) => {
        clearTimeout(timerId);
        timerId = setTimeout(callback, delay, args);
      };
    };

    const setSearchQuery = useCallback(
      debounce((args: string) => {
        setSearchParams(getSearchWith(searchParams, {
          query: args || null,
        }));
      }, 2000), [searchParams],
    );

    useEffect(() => {
      setQuery(searchQuery);
    }, [!searchQuery]);

    return (
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={({ target: { value } }) => {
              setQuery(value);
              setSearchQuery(value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
    );
  },
);
