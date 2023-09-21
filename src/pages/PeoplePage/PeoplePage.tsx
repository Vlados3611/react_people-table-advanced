import {
  useState,
  useEffect,
  useMemo,
} from 'react';
import {
  SearchParamsProvider,
} from '../../components/SearchParamsContext/SearchParamsContext';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleProvider } from '../../components/PeopleContext/PeopleContext';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const loadPeople = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await getPeople();

      setPeople(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const newValue = useMemo(() => {
    return {
      people,
    };
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <SearchParamsProvider>
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <PeopleProvider value={newValue}>
              <div className="column">
                <div className="box table-container">
                  {isLoading && (
                    <Loader />
                  )}

                  {!isLoading && (
                    <>
                      {isError && (
                        <p data-cy="peopleLoadingError">Something went wrong</p>
                      )}

                      {!isError && (
                        <>
                          {people.length > 0
                            ? (
                              <PeopleTable />
                            ) : (
                              <p data-cy="noPeopleMessage">
                                There are no people on the server
                              </p>
                            )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </PeopleProvider>
          </SearchParamsProvider>
        </div>
      </div>
    </>
  );
};
