import React, { useMemo } from 'react';
import { FilterType } from '../../types/FilterType';
import { CenturyLink } from '../Link/CenturyLink/CenturyLink';
import { SexTypeLink } from '../Link/SexTypeLink/SexTypeLink';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { SearchLink } from '../Link/SearchLink/SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = React.memo(
  () => {
    const resetAll = useMemo(() => {
      return {
        sex: null,
        query: null,
        centuries: null,
      };
    }, []);

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          {Object.entries(FilterType).map(([key, value]) => (
            <SexTypeLink
              text={key}
              type={value}
            />
          ))}
        </p>

        <SearchFilter />

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuriesList.map((century: string) => (
                <CenturyLink century={century} />
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                params={{
                  centuries: null,
                }}
                data-cy="centuryALL"
                className="button is-success is-outlined"
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <SearchLink
            params={resetAll}
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    );
  },
);
