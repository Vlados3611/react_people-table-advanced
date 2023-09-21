import React, {
  useContext,
} from 'react';
import classNames from 'classnames';
import {
  SearchParamsContext,
} from '../../SearchParamsContext/SearchParamsContext';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  title: string;
  type: string;
};

export const SortTypeLink: React.FC<Props> = React.memo(
  ({ title, type }) => {
    const { searchParams } = useContext(SearchParamsContext);
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';
    const isSelected = sort === type;

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {title}
          <SearchLink
            params={{
              sort: isSelected && order
                ? null
                : type,
              order: isSelected && !order
                ? 'desc'
                : null,
            }}
          >
            <span className="icon">
              <i className={classNames(
                'fas',
                {
                  'fa-sort': !isSelected,
                  'fa-sort-up': isSelected && order !== 'desc',
                  'fa-sort-down': isSelected && order === 'desc',
                },
              )}
              />
            </span>
          </SearchLink>
        </span>
      </th>
    );
  },
);
