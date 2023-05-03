import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState, useCallback } from 'react';

export const AppContext = createContext();

const URL = 'https://swapi.dev/api/planets';

export default function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filtersData, setFiltersData] = useState({
    filterByNumericValues: [],
  });

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

  const filterPlanets = useCallback(({ column, comparison, value }) => {
    let filtered = [];
    const arrayToFilter = filteredPlanets.length > 0 ? filteredPlanets : apiData;
    if (comparison.includes('maior que')) {
      filtered = arrayToFilter.filter((p) => Number(p[column]) > Number(value));
    } else if (comparison.includes('menor que')) {
      filtered = arrayToFilter.filter((p) => Number(p[column]) < Number(value));
    } else if (comparison.includes('igual a')) {
      filtered = arrayToFilter.filter((p) => Number(p[column]) === Number(value));
    }
    setFilteredPlanets(filtered);
    setFiltersData({
      ...filtersData,
      filterByNumericValues: [...filtersData.filterByNumericValues,
        { column, comparison, value }],
    });
  }, [apiData, filteredPlanets, filtersData]);

  const context = useMemo(() => ({
    apiData,
    // setApiData,
    nameFilter,
    setNameFilter,
    filterPlanets,
    filteredPlanets,
    filtersData,
    // setFiltersData,
  }), [apiData, nameFilter, setNameFilter, filterPlanets,
    filteredPlanets, filtersData]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
