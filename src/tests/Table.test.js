import { render, screen, waitFor } from "@testing-library/react";
import { mockPlanets } from "./mocks/mockPlanets";
import App from "../App";
import AppProvider from "../context/AppProvider";
import userEvent from "@testing-library/user-event";

describe('Testes da tabela', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockPlanets),
    });
  });

  test('Verifica se os componentes da tabela foram renderizados corretamente', () => {
    render(<AppProvider><App /></AppProvider>);
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument();
      expect(screen.getByRole('cell', {  name: /kamino/i})).toBeInTheDocument();
    });
  });

  test('Verifica se o input de texto está filtrando pelo nome digitado', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /kamino/i})).toBeInTheDocument();

    const inputNameEl = screen.getByTestId('name-filter');
    userEvent.type(inputNameEl, 't');
    expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument();
    expect(screen.queryByRole('cell', {  name: /kamino/i})).not.toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /hoth/i})).toBeInTheDocument();

    userEvent.clear(inputNameEl);
    userEvent.type(inputNameEl, 'to');
    expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument();
    expect(screen.queryByRole('cell', {  name: /hoth/i})).not.toBeInTheDocument();
  })

  test('Verifica se o filtro de column adiciona o filtro maior que...', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();
    
    const columnEl = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnEl, ['diameter'])

    const comparisonEl = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonEl, ['maior que']);

    const valueEl = screen.getByTestId('value-filter');
    userEvent.type(valueEl, '100000');

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter);

    expect(screen.getByRole('cell', {  name: /bespin/i})).toBeInTheDocument();
    expect(screen.queryByRole('cell', {  name: /tatooine/i})).not.toBeInTheDocument();
  });

  test('Verifica se o filtro de column adiciona o filtro menor que...', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();
    
    const columnEl = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnEl, ['population'])

    const comparisonEl = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonEl, ['menor que']);

    const valueEl = screen.getByTestId('value-filter');
    userEvent.type(valueEl, '50000');

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter);

    expect(screen.getByRole('cell', {  name: /yavin/i})).toBeInTheDocument();
    expect(screen.queryByRole('cell', {  name: /tatooine/i})).not.toBeInTheDocument();
  });

  test('Verifica se o filtro de column adiciona o filtro igual a...', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();
    
    const columnEl = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnEl, ['surface_water'])

    const comparisonEl = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonEl, ['igual a']);

    const valueEl = screen.getByTestId('value-filter');
    userEvent.type(valueEl, '12');

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter);

    expect(screen.getByRole('cell', {  name: /naboo/i})).toBeInTheDocument();
    expect(screen.queryByRole('cell', {  name: /tatooine/i})).not.toBeInTheDocument();
  });
})