import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

export default function NumericFilters() {
  const { filtersData, deleteFilter, deleteAllFilters } = useContext(AppContext);
  return (
    <>
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
