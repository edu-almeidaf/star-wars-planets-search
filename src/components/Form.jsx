import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

export default function Form() {
  const { nameFilter, setNameFilter } = useContext(AppContext);
  return (
    <form>
      <label>
        <input
          type="text"
          placeholder="Filtrar por nome"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
      </label>
    </form>
  );
}
