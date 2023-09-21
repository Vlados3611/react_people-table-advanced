import React from 'react';
import {
  Link,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types';

type Props = {
  parent: Person | undefined;
  parentName: string | null;
};

export const Parentlink: React.FC<Props> = React.memo(
  ({ parent, parentName }) => {
    const pathName = useResolvedPath('../').pathname;
    const { search } = useLocation();
    const isParentFound = parent !== undefined;

    return (
      <td>
        {isParentFound
          ? (
            <Link
              to={{
                pathname: pathName + parent.slug,
                search,
              }}
              className={classNames({
                'has-text-danger': parent.sex === 'f',
              })}
            >
              {parentName}
            </Link>
          )
          : parentName || '-'}
      </td>
    );
  },
);
