export const Filters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
} as const;

export type Filters = (typeof Filters)[keyof typeof Filters];
