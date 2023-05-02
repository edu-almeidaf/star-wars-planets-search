import { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';

export default function Form() {
  const [columnFilters, setColumnFilters] = useState({
    column: 'population',
    parameter: 'maior que',
    value: 0,
  });

  const { nameFilter, setNameFilter, filterPlanets } = useContext(AppContext);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="parameter">
        Operador:
        <select
          name="parameter"
          id="parameter"
          data-testid="comparison-filter"
          value={ columnFilters.parameter }
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
  );
}
