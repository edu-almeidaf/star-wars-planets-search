import { render, screen } from "@testing-library/react";
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
  });
});