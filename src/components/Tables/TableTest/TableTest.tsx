import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { type ColDef } from 'ag-grid-community';

interface Car {
  make: string;
  model: string;
  price: number;
}

export const TableTest = () => {
  const [rowData] = useState<Car[]>([
    { make: 'Tesla', model: 'Model 3', price: 45000 },
    { make: 'Ford', model: 'Mustang', price: 27000 },
    { make: 'Toyota', model: 'Corolla', price: 21000 },
  ]);

  const [colDefs] = useState<ColDef<Car>[]>([
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
  ]);

  return (
    <AgGridReact<Car>
      rowData={rowData}
      columnDefs={colDefs}
      //   autoSizeStrategy={{ type: 'fitProvidedWidth', width: 700 }}
      onGridReady={(params) => {
        params.api.sizeColumnsToFit();
      }}
    />
  );
};
