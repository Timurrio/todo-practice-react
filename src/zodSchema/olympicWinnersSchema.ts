import z from 'zod';

const olympicWinnerSchema = z.object({
  athlete: z.string(),
  age: z.number().nullable().optional(),
  country: z.string(),
  year: z.number(),
  date: z.string().optional(),
  sport: z.string(),
  gold: z.number(),
  silver: z.number(),
  bronze: z.number(),
  total: z.number(),
});

const olympicWinnersSchema = z.array(olympicWinnerSchema);

export default olympicWinnersSchema;
