import React, { useContext } from 'react';
import classNames from 'classnames';
import {
  SearchParamsContext,
} from '../../SearchParamsContext/SearchParamsContext';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  century: string;
};

export const CenturyLink: React.FC<Props> = React.memo(
  ({ century }) => {
    const { searchParams } = useContext(SearchParamsContext);
    const centuries = searchParams.getAll('centuries');
    const isIncludes = centuries.includes(century);

    return (
      <SearchLink
        params={{
          centuries: isIncludes
            ? centuries.filter((cen: string) => (
              cen !== century
            ))
            : [...centuries, century],
        }}
        data-cy="century"
        className={classNames(
          'button',
          'mr-1',
          {
            'is-info': isIncludes,
          },
        )}
      >
        {century}
      </SearchLink>
    );
  },
);
