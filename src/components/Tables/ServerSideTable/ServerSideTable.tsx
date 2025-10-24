import { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  type ColDef,
  type GridReadyEvent,
  type IServerSideDatasource,
  type IServerSideGetRowsRequest,
} from 'ag-grid-community';
import type IOlympicData from '../../../types/IOlympicData';

const createServerSideDatasource: (server: any) => IServerSideDatasource = (
  server: any
) => {
  return {
    getRows: (params) => {
      const response = server.getData(params.request);
      setTimeout(() => {
        if (response.success) {
          params.success({ rowData: response.rows });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
};

function createFakeServer(allData: any[]) {
  return {
    getData: (request: IServerSideGetRowsRequest) => {
      const requestedRows = allData.slice(request.startRow, request.endRow);
      return {
        success: true,
        rows: requestedRows,
      };
    },
  };
}

const ServerSideTable = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', minWidth: 220 },
    { field: 'country', minWidth: 200 },
    { field: 'year' },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => {
        const fakeServer = createFakeServer(data);
        const datasource = createServerSideDatasource(fakeServer);
        params.api!.setGridOption('serverSideDatasource', datasource);
      });
  }, []);

  return (
    <AgGridReact<IOlympicData>
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowModelType={'serverSide'}
      onGridReady={onGridReady}
    />
  );
};

export default ServerSideTable;
