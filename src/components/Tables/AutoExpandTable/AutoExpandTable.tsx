import {
  createGrid,
  type GridApi,
  type GridOptions,
  type IsGroupOpenByDefaultParams,
} from 'ag-grid-enterprise';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const AutoExpandTable = () => {
  const gridElement = useRef(null);
  const { country, year } = useParams<{ country?: string; year?: string }>();

  useEffect(() => {
    if (!gridElement.current) return;

    let gridApi: GridApi<IOlympicData>;

    const gridOptions: GridOptions<IOlympicData> = {
      columnDefs: [
        { field: 'country', rowGroup: true },
        { field: 'year', rowGroup: true },
        { field: 'sport' },
        { field: 'athlete' },
        { field: 'total' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      isGroupOpenByDefault: (params: IsGroupOpenByDefaultParams) => {
        if (!country || !year) return false;

        const route = params.rowNode.getRoute();
        if (!route || route.length === 0) return false;

        const expectedPath = [country, year];
        return route.every((part, i) => expectedPath[i] === part);
      },
    };

    gridApi = createGrid(gridElement.current, gridOptions);

    async function getOlympicWinnersData() {
      await fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((response) => response.json())
        .then((data: IOlympicData[]) => {
          gridApi.setGridOption('rowData', data);
          gridApi.sizeColumnsToFit();
        });
    }
    getOlympicWinnersData();

    return () => {
      gridApi.destroy();
    };
  }, []);

  return (
    <div ref={gridElement} style={{ width: '100%', height: '100%' }}></div>
  );
};

export default AutoExpandTable;
