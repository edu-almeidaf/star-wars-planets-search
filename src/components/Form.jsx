import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppProvider';

const columnOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

export default function Form() {
  const [activeFilters, setActiveFilters] = useState(columnOptions);
  const [columnFilters, setColumnFilters] = useState({
    column: activeFilters[0],
    comparison: 'maior que',
    value: 0,
  });

  const { nameFilter, setNameFilter, filterPlanets, filtersData,
    deleteFilter, deleteAllFilters } = useContext(AppContext);

  useEffect(() => {
    const filteredOptions = columnOptions.filter((option) => (
      !filtersData.filterByNumericValues.map((item) => item.column).includes(option)));
    const initialState = {
      column: filteredOptions[0],
      comparison: 'maior que',
      value: 0,
    };
    setActiveFilters(filteredOptions);
    setColumnFilters(initialState);
  }, [filtersData]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setColumnFilters({
      ...columnFilters,
      [name]: value,
    });
  };

  const handleColumnFilters = (event) => {
    event.preventDefault();
    filterPlanets(columnFilters);
  };

  return (
    <>
      <form onSubmit={ handleColumnFilters }>
        <label>
          <input
            type="text"
            placeholder="Filtrar por nome"
            data-testid="name-filter"
            value={ nameFilter }
            onChange={ ({ target }) => setNameFilter(target.value) }
          />
        </label>

        <label htmlFor="column">
          Coluna:
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            value={ columnFilters.column }
            onChange={ handleChange }
          >
            {
              activeFilters.map((option, index) => (
                <option value={ option } key={ index }>{ option }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="comparison">
          Operador:
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            value={ columnFilters.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label>
          <input
            type="number"
            data-testid="value-filter"
            name="value"
            value={ columnFilters.value }
            onChange={ handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      <div>
        {
          filtersData.filterByNumericValues.map((obj, index) => (
            <div key={ index } data-testid="filter">
              <p>{ `${obj.column} ${obj.comparison} ${obj.value}` }</p>
              <button
                type="button"
                onClick={ () => deleteFilter(obj.column) }
              >
                X
              </button>
            </div>
          ))
        }
      </div>
      <button
        type="button"
        onClick={ deleteAllFilters }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
    </>
  );
}
