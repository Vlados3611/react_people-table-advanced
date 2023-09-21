import React, {
  useMemo,
  useContext,
} from 'react';
import {
  SearchParamsContext,
} from '../SearchParamsContext/SearchParamsContext';
import { PeopleContext } from '../PeopleContext/PeopleContext';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { Person } from '../../types';
import { SortTypeLink } from '../Link/SortTypeLink/SortTypeLink';
import { SortType } from '../../types/SortType';

export const PeopleTable: React.FC = React.memo(
  () => {
    const { searchParams } = useContext(SearchParamsContext);
    const { people } = useContext(PeopleContext);
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';
    const currentSexFilter = searchParams.get('sex') || '';
    const query = searchParams.get('query') || '';
    const currentCenturiesFilter = searchParams.getAll('centuries') || [];

    const visiblePeople = useMemo(() => {
      let peopleList = [...people];

      if (currentSexFilter.length) {
        peopleList = peopleList.filter((person: Person) => (
          person.sex === currentSexFilter
        ));
      }

      if (currentCenturiesFilter.length) {
        peopleList = peopleList.filter((person: Person) => {
          const bornCentury = Math.ceil(person.born / 100);
          const diedCentury = Math.ceil(person.died / 100);
          const personCentury = [bornCentury, diedCentury];

          return currentCenturiesFilter.some((century: string) => (
            personCentury.includes(+century)
          ));
        });
      }

      if (sort) {
        peopleList = peopleList.sort((acc: Person, curr: Person) => {
          switch (sort) {
            case 'name':
            case 'sex':
              return acc[sort].localeCompare(curr[sort]);

            case 'born':
            case 'died':
              return acc[sort] - curr[sort];

            default:
              return 0;
          }
        });

        if (order === 'desc') {
          peopleList = peopleList.reverse();
        }
      }

      if (query) {
        peopleList = peopleList.filter((person: Person) => (
          (person.name.toLowerCase()
            .includes(query.toLowerCase())
            || person.motherName?.toLowerCase()
              .includes(query.toLowerCase())
            || person.fatherName?.toLowerCase()
              .includes(query.toLowerCase()))
        ));
      }

      return peopleList;
    }, [
      sort,
      order,
      currentSexFilter,
      query,
      currentCenturiesFilter,
    ]);

    return (
      <>
        {visiblePeople.length > 0
          ? (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {Object.entries(SortType).map(([key, value]) => (
                    <SortTypeLink
                      title={key}
                      type={value}
                    />
                  ))}

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {visiblePeople.map((person: Person) => (
                  <PersonInfo
                    key={person.slug}
                    person={person}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p>
              There are no people matching the current search criteria
            </p>
          )}
      </>
    );
  },
);
