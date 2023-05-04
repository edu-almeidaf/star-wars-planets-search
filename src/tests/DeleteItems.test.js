import { render, screen } from "@testing-library/react";
import { mockPlanets } from "./mocks/mockPlanets";
import App from "../App";
import AppProvider from "../context/AppProvider";
import userEvent from "@testing-library/user-event";

describe('Testes das funções de deletar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockPlanets),
    });
  });

  test('Verifica se os botões de deletar estão funcionando', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();
    
    const columnEl1 = screen.getByTestId('column-filter');
    const comparisonEl1 = screen.getByTestId('comparison-filter');
    const valueEl1 = screen.getByTestId('value-filter');
    const btnFilter1 = screen.getByTestId('button-filter');
    
    userEvent.selectOptions(columnEl1, ['diameter'])
    userEvent.selectOptions(comparisonEl1, ['maior que']);
    userEvent.type(valueEl1, '8900');
    userEvent.click(btnFilter1);

    expect(screen.getAllByTestId('planet-name')).toHaveLength(7);

    const columnEl2 = screen.getByTestId('column-filter');
    const comparisonEl2 = screen.getByTestId('comparison-filter');
    const valueEl2 = screen.getByTestId('value-filter');
    const btnFilter2 = screen.getByTestId('button-filter');
    
    userEvent.selectOptions(columnEl2, ['population'])
    userEvent.selectOptions(comparisonEl2, ['menor que']);
    userEvent.type(valueEl2, '1000000');
    userEvent.click(btnFilter2);

    expect(screen.getAllByTestId('planet-name')).toHaveLength(2);

    const deleteButtons = screen.getAllByTestId('filter-delete-btn');
    expect(deleteButtons).toHaveLength(2);

    userEvent.click(deleteButtons[1]);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(7);

    userEvent.click(deleteButtons[0]);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
  });

  test('Verifica se ao clicar no botão de limpar filtros, todos os filtros são retirados', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();
    
    const columnEl1 = screen.getByTestId('column-filter');
    const comparisonEl1 = screen.getByTestId('comparison-filter');
    const valueEl1 = screen.getByTestId('value-filter');
    const btnFilter1 = screen.getByTestId('button-filter');
    
    userEvent.selectOptions(columnEl1, ['diameter'])
    userEvent.selectOptions(comparisonEl1, ['maior que']);
    userEvent.type(valueEl1, '8900');
    userEvent.click(btnFilter1);

    const columnEl2 = screen.getByTestId('column-filter');
    const comparisonEl2 = screen.getByTestId('comparison-filter');
    const valueEl2 = screen.getByTestId('value-filter');
    const btnFilter2 = screen.getByTestId('button-filter');
    
    userEvent.selectOptions(columnEl2, ['population']);
    userEvent.selectOptions(comparisonEl2, ['menor que']);
    userEvent.type(valueEl2, '1000000');
    userEvent.click(btnFilter2);

    const deleteButtons = screen.getAllByTestId('filter-delete-btn');
    expect(deleteButtons).toHaveLength(2);

    const removeAllFiltersBtn = screen.getByRole('button', { name: /remover filtros/i });
    userEvent.click(removeAllFiltersBtn);

    const newDeleteButtons = screen.queryAllByTestId('filter-delete-btn');
    expect(newDeleteButtons).toHaveLength(0);
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
  });
});