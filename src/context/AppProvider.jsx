import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

export const AppContext = createContext();

const URL = 'https://swapi.dev/api/planets';

export default function AppProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  // const [filteredPlanets, setFilteredPlanets] = useState([]);

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

  const context = useMemo(() => ({
    apiData, setApiData,
  }), [apiData, setApiData]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
