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
    order: {},
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

  const filterPlanets = useCallback((
    { column, comparison, value },
    array = filteredPlanets,
  ) => {
    let filtered = [];
    if (comparison.includes('maior que')) {
      filtered = array.filter((p) => Number(p[column]) > Number(value));
    } else if (comparison.includes('menor que')) {
      filtered = array.filter((p) => Number(p[column]) < Number(value));
    } else if (comparison.includes('igual a')) {
      filtered = array.filter((p) => Number(p[column]) === Number(value));
    }
    setFilteredPlanets(filtered);
    setFiltersData({
      ...filtersData,
      filterByNumericValues: [...filtersData.filterByNumericValues,
        { column, comparison, value }],
    });
    return filtered;
  }, [filteredPlanets, filtersData]);

  const sortPlanets = useCallback(({ column, sort }) => {
    const unknownEl = filteredPlanets.filter((e) => e[column] === 'unknown');
    const validEL = filteredPlanets.filter((e) => e[column] !== 'unknown');
    let arraySort = [];

    if (sort.includes('ASC')) {
      arraySort = validEL.sort((a, b) => Number(a[column]) - Number(b[column]));
    } else if (sort.includes('DESC')) {
      arraySort = validEL.sort((a, b) => Number(b[column]) - Number(a[column]));
    }

    setFilteredPlanets([...arraySort, ...unknownEl]);
    setFiltersData({ ...filtersData, order: { column, sort } });
  }, [filteredPlanets, filtersData]);

  const deleteFilter = useCallback((filterName) => {
    const newFilterData = filtersData.filterByNumericValues.filter((obj) => (
      obj.column !== filterName
    ));
    if (newFilterData.length > 0) {
      let arrayToFilter = [...apiData];
      newFilterData.forEach((filterObj) => {
        arrayToFilter = filterPlanets(filterObj, arrayToFilter);
      });
    } else {
      setFilteredPlanets(apiData);
    }
    setFiltersData({
      ...filtersData,
      filterByNumericValues: newFilterData,
    });
  }, [filtersData, apiData, filterPlanets]);

  const deleteAllFilters = useCallback(() => {
    setFilteredPlanets(apiData);
    setFiltersData({
      ...filtersData,
      filterByNumericValues: [],
      order: {},
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
    sortPlanets,
  }), [apiData, nameFilter, setNameFilter, filterPlanets,
    filteredPlanets, filtersData, deleteFilter, deleteAllFilters, sortPlanets]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
