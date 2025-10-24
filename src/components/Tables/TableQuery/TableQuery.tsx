import { useQuery } from '@tanstack/react-query';
import getOlympicWinnersData from '../../../functions/getOlympicWinnersData';
import { AgGridReact } from 'ag-grid-react';
import type IOlympicData from '../../../types/IOlympicData';
import { useRef, useState } from 'react';
import type { ColDef } from 'ag-grid-enterprise';
import { type GridReadyEvent } from 'ag-grid-community';
import { Box, Button, Skeleton } from '@mui/material';

const handleOnGridReady = (params: GridReadyEvent) => {
  params.api.sizeColumnsToFit();
};

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
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'sport', editable: true },
    { field: 'athlete', editable: true, cellDataType: 'text' },
    { field: 'total', editable: true, cellDataType: 'number' },
    { field: 'date', editable: true, cellDataType: 'date' },
    {
      headerName: 'Has Gold',
      field: 'gold',
      cellDataType: 'boolean',
      editable: false,
      valueGetter: (params) => params.data?.gold && params.data?.gold > 0,
    },
  ]);

  const gridRef = useRef<AgGridReact<IOlympicData>>(null);

  const handleDeleteSelected = () => {
    const gridApi = gridRef.current?.api;
    if (!gridApi) return;
    const selectedRows = gridApi.getSelectedRows();
    gridApi.applyTransaction({ remove: selectedRows });
  };

  const handleAddTotal = () => {
    const gridApi = gridRef.current?.api;
    if (!gridApi) return;
    const selectedRows = gridApi.getSelectedRows();

    const TOTAL_INCREMENT = 10;

    selectedRows.forEach((row) => {
      row.total = (row.total || 0) + TOTAL_INCREMENT;
    });

    gridApi.applyTransaction({ update: selectedRows });
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isPending) {
    return <Skeleton height={'100%'} variant="rectangular" />;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          margin: '10px 0',
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddTotal}>
          Increment Total
        </Button>
      </Box>

      <AgGridReact<IOlympicData>
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={(params: GridReadyEvent) => handleOnGridReady(params)}
        gridOptions={{
          rowSelection: {
            mode: 'multiRow',
            groupSelects: 'descendants',
          },
        }}
      />
    </>
  );
};

export default TableQuery;
