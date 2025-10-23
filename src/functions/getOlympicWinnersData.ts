import olympicWinnersSchema from '../zodSchema/olympicWinnersSchema';

export default async function getOlympicWinnersData() {
  const response = await fetch(
    'https://www.ag-grid.com/example-assets/olympic-winners.json'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch olympic winners data');
  }

  const data = await response.json();

  const parsedData = olympicWinnersSchema.parse(data);

  return parsedData;
}
