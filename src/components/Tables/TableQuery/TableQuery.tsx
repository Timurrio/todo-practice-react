import { useQuery } from '@tanstack/react-query';
import getOlympicWinnersData from '../../../functions/getOlympicWinnersData';
import { AgGridReact } from 'ag-grid-react';
import type IOlympicData from '../../../types/IOlympicData';
import { useState } from 'react';
import type { ColDef } from 'ag-grid-enterprise';
import { type GridReadyEvent } from 'ag-grid-community';
import { Skeleton } from '@mui/material';

const TableQuery = () => {
  const {
    data: rowData,
    isPending,
    error,
  } = useQuery({
    queryKey: ['olympicWinners'],
    queryFn: getOlympicWinnersData,
  });

  const [colDefs] = useState<ColDef<IOlympicData>[]>([
    { field: 'country', rowGroup: true },
    { field: 'year', rowGroup: true },
    { field: 'sport' },
    { field: 'athlete' },
    { field: 'total' },
  ]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isPending) {
    return <Skeleton height={'100%'} variant="rectangular" />;
  }

  return (
    <AgGridReact<IOlympicData>
      rowData={rowData}
      columnDefs={colDefs}
      onGridReady={(params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();
      }}
    />
  );
};

export default TableQuery;
