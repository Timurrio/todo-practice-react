import { useQuery } from '@tanstack/react-query';
import getOlympicWinnersData from '../../../functions/getOlympicWinnersData';
import { AgGridReact } from 'ag-grid-react';
import type IOlympicData from '../../../types/IOlympicData';
import { useState } from 'react';
import type { ColDef, GridApi } from 'ag-grid-enterprise';
import { type GridReadyEvent } from 'ag-grid-community';
import { Box, Button, Skeleton } from '@mui/material';

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

  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const handleDeleteSelected = () => {
    if (!gridApi) return;
    const selectedRows = gridApi.getSelectedRows();
    gridApi.applyTransaction({ remove: selectedRows });
  };

  const handleAddTotal = () => {
    if (!gridApi) return;
    const selectedRows = gridApi.getSelectedRows();

    selectedRows.forEach((row) => {
      row.total = (row.total || 0) + 10;
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
          Total + 10
        </Button>
      </Box>

      <AgGridReact<IOlympicData>
        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={(params: GridReadyEvent) => {
          setGridApi(params.api);
          params.api.sizeColumnsToFit();
        }}
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
