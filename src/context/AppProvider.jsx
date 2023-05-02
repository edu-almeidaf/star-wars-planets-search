import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState, useCallback } from 'react';

export const AppContext = createContext();

const URL = 'https://swapi.dev/api/planets';

export default function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      const dataArray = data.results.map((planet) => {
        const { residents, ...objWithoutResidents } = planet;
        return objWithoutResidents;
      });
      setApiData(dataArray);
    };
    fetchApi();
  }, []);

  const filterPlanets = useCallback(({ column, parameter, value }) => {
    let filtered = [];
    const arrayToFilter = filteredPlanets.length > 0 ? filteredPlanets : apiData;
    if (parameter.includes('maior que')) {
      filtered = arrayToFilter.filter((p) => Number(p[column]) > Number(value));
    } else if (parameter.includes('menor que')) {
      filtered = arrayToFilter.filter((p) => Number(p[column]) < Number(value));
    } else if (parameter.includes('igual a')) {
      filtered = arrayToFilter.filter((p) => Number(p[column]) === Number(value));
    }
    setFilteredPlanets(filtered);
  }, [apiData, filteredPlanets]);

  const context = useMemo(() => ({
    apiData,
    setApiData,
    nameFilter,
    setNameFilter,
    filterPlanets,
    filteredPlanets,
  }), [apiData, setApiData, nameFilter, setNameFilter, filterPlanets, filteredPlanets]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
