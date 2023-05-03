import React from 'react';
import './App.css';
import Table from './components/Table';
import Form from './components/Form';
import DeleteNumericFilters from './components/DeleteNumericFilters';
import OrderFilters from './components/OrderFilters';

function App() {
  return (
    <>
      <Form />
      <DeleteNumericFilters />
      <OrderFilters />
      <Table />
    </>
  );
}

export default App;
