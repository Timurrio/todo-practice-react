import olympicWinnersSchema from '../zodSchema/olympicWinnersSchema';
import { parse } from 'date-fns';

export default async function getOlympicWinnersData() {
  const response = await fetch(
    'https://www.ag-grid.com/example-assets/olympic-winners.json'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch olympic winners data');
  }

  const data = await response.json();

  const parsedData = olympicWinnersSchema.parse(data);

  const formattedData = parsedData.map((item) => ({
    ...item,
    date: item.date ? parse(item.date, 'dd/MM/yyyy', new Date()) : null,
  }));

  return formattedData;
}
