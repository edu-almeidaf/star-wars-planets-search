import { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';

const columnOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

export default function OrderFilters() {
  const [orderFilters, setOrderFilters] = useState({
    column: columnOptions[0],
    sort: '',
  });

  const { sortPlanets } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setOrderFilters({
      ...orderFilters,
      [name]: value,
    });
  };

  const handleOrderFilters = (event) => {
    event.preventDefault();
    sortPlanets(orderFilters);
  };

  return (
    <form onSubmit={ handleOrderFilters }>
      <label>
        Coluna:
        <select
          name="column"
          data-testid="column-sort"
          value={ orderFilters.column }
          onChange={ handleChange }
        >
          {
            columnOptions.map((option, index) => (
              <option value={ option } key={ index }>{ option }</option>
            ))
          }
        </select>
      </label>

      <label htmlFor="asc">
        ASC:
        <input
          name="sort"
          type="radio"
          id="asc"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="desc">
        DESC:
        <input
          name="sort"
          type="radio"
          id="desc"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ handleChange }
        />
      </label>

      <button
        type="submit"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </form>
  );
}
