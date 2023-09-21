import React, {
  useContext, useMemo,
} from 'react';
import {
  Link,
  useParams,
  useResolvedPath,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { PeopleContext } from '../PeopleContext/PeopleContext';
import { Person } from '../../types';
import { Parentlink } from '../Link/ParentLink/ParentLink';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = React.memo(
  ({ person }) => {
    const {
      name,
      sex,
      born,
      died,
      motherName,
      fatherName,
      slug,
    } = person;
    const { people } = useContext(PeopleContext);
    const { personSlug } = useParams();
    const pathName = useResolvedPath('/people/').pathname;
    const { search } = useLocation();
    const isIncludes = personSlug === slug;
    const isFemale = sex === 'f';

    const hasMother = useMemo(() => {
      return people.find((per: Person) => (
        per.name === person.motherName
      ));
    }, []);
    const hasFather = useMemo(() => {
      return people.find((per: Person) => (
        per.name === person.fatherName
      ));
    }, []);

    return (
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': isIncludes,
        })}
      >
        <td>
          <Link
            to={{
              pathname: isIncludes
                ? pathName
                : pathName + person.slug,
              search,
            }}
            className={classNames({
              'has-text-danger': isFemale,
            })}
          >
            {name}
          </Link>
        </td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <Parentlink
          parent={hasMother || undefined}
          parentName={motherName}
        />
        <Parentlink
          parent={hasFather || undefined}
          parentName={fatherName}
        />
      </tr>
    );
  },
);
