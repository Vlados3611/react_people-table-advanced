import React, { useContext } from 'react';
import classNames from 'classnames';
import {
  SearchParamsContext,
} from '../../SearchParamsContext/SearchParamsContext';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  text: string;
  type: string;
};

export const SexTypeLink: React.FC<Props> = React.memo(
  ({ text, type }) => {
    const { searchParams } = useContext(SearchParamsContext);
    const sex = searchParams.get('sex') || '';

    return (
      <SearchLink
        params={{
          sex: type || null,
        }}
        className={classNames({
          'is-active': sex === type,
        })}
      >
        {text}
      </SearchLink>
    );
  },
);
