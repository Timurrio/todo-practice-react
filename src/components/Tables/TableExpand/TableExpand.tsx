import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { type ColDef, type GridReadyEvent } from 'ag-grid-community';

interface Car {
  make: string;
  model: string;
  price: number;
}

export const TableExpand = () => {
  const [rowData] = useState<Car[]>([
    { make: 'Tesla', model: 'Model 3', price: 45000 },
    { make: 'Tesla', model: 'Model S', price: 720000 },
    { make: 'Ford', model: 'Mustang', price: 27000 },
    { make: 'Ford', model: 'Focus', price: 62000 },
    { make: 'Toyota', model: 'Corolla', price: 21000 },
    { make: 'Toyota', model: 'LoremIpsum', price: 42000 },
    { make: 'Toyota', model: 'TestModel', price: 123456 },
  ]);

  const [colDefs] = useState<ColDef<Car>[]>([
    { field: 'make', rowGroup: true, hide: true, filter: true },
    { field: 'model', filter: true },
    { field: 'price', filter: true },
  ]);

  return (
    <AgGridReact<Car>
      rowData={rowData}
      columnDefs={colDefs}
      onGridReady={(params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();
      }}
    />
  );
};
