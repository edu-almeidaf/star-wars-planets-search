import { render, screen, fireEvent } from "@testing-library/react";
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

  test('Verifica se ao clicar nos input ASC ele ordena o array de ordem crescente', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();

    const beforeArraySort = screen.getAllByTestId('planet-name');
    expect(beforeArraySort[0].innerHTML).toBe('Tatooine');
    expect(beforeArraySort[beforeArraySort.length - 1].innerHTML).toBe('Kamino');
    
    const inputAscEl = screen.getByTestId("column-sort-input-asc");
    const inputColumnEl = screen.getByTestId('column-sort');
    const btnSort = screen.getByRole('button', { name: /ordenar/i });
    userEvent.selectOptions(inputColumnEl, ['population']);
    fireEvent.click(inputAscEl);
    userEvent.click(btnSort);

    const afterArraySort = screen.getAllByTestId('planet-name');
    expect(afterArraySort[0].innerHTML).toBe('Yavin IV');
    expect(afterArraySort[afterArraySort.length - 1].innerHTML).toBe('Dagobah');
  });

  test('Verifica se ao clicar nos input DESC ele ordena o array de ordem decrescente', async () => {
    render(<AppProvider><App /></AppProvider>);
    const planet1El = await screen.findByRole('cell', {  name: /tatooine/i});
    expect(planet1El).toBeInTheDocument();

    const beforeArraySort = screen.getAllByTestId('planet-name');
    expect(beforeArraySort[0].innerHTML).toBe('Tatooine');
    expect(beforeArraySort[beforeArraySort.length - 1].innerHTML).toBe('Kamino');
    
    const inputDescEl = screen.getByTestId("column-sort-input-desc");
    const inputColumnEl = screen.getByTestId('column-sort');
    const btnSort = screen.getByRole('button', { name: /ordenar/i });
    userEvent.selectOptions(inputColumnEl, ['diameter']);
    fireEvent.click(inputDescEl);
    userEvent.click(btnSort);

    const afterArraySort = screen.getAllByTestId('planet-name');
    expect(afterArraySort[0].innerHTML).toBe('Bespin');
    expect(afterArraySort[afterArraySort.length - 1].innerHTML).toBe('Endor');
  });
})