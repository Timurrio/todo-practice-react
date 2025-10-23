export default interface IOlympicData {
  athlete: string;
  age?: number | null;
  country: string;
  year: number;
  date?: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
