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
      setFilteredPlanets(dataArray);
    };
    fetchApi();
  }, []);

  const filterPlanets = useCallback(({ column, comparison, value }) => {
    let filtered = [];
    if (comparison.includes('maior que')) {
      filtered = filteredPlanets.filter((p) => Number(p[column]) > Number(value));
    } else if (comparison.includes('menor que')) {
      filtered = filteredPlanets.filter((p) => Number(p[column]) < Number(value));
    } else if (comparison.includes('igual a')) {
      filtered = filteredPlanets.filter((p) => Number(p[column]) === Number(value));
    }
    setFilteredPlanets(filtered);
    setFiltersData({
      ...filtersData,
      filterByNumericValues: [...filtersData.filterByNumericValues,
        { column, comparison, value }],
    });
  }, [filteredPlanets, filtersData]);

  const deleteFilter = useCallback(async (filterName) => {
    const newFilterData = filtersData.filterByNumericValues.filter((obj) => (
      obj.column !== filterName
    ));
    console.log(newFilterData);
    setFilteredPlanets(apiData);
    if (newFilterData.length > 0) {
      newFilterData.forEach((filterObj) => filterPlanets(filterObj));
    }
    setFiltersData({
      ...filtersData,
      filterByNumericValues: newFilterData,
    });
  }, [filtersData, filterPlanets, apiData]);

  const deleteAllFilters = useCallback(() => {
    setFilteredPlanets(apiData);
    setFiltersData({
      ...filtersData,
      filterByNumericValues: [],
    });
  }, [filtersData, apiData]);

  const context = useMemo(() => ({
    apiData,
    nameFilter,
    setNameFilter,
    filterPlanets,
    filteredPlanets,
    filtersData,
    deleteFilter,
    deleteAllFilters,
  }), [apiData, nameFilter, setNameFilter, filterPlanets,
    filteredPlanets, filtersData, deleteFilter, deleteAllFilters]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
