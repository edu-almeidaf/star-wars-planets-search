import { render, screen, waitFor } from "@testing-library/react";
import { mockPlanets } from "./mocks/mockPlanets";
import App from "../App";
import AppProvider from "../context/AppProvider";

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
})