import filterTodos from '../functions/filterTodos';
import Filters from '../types/filters';
import { expect, test } from 'vitest';

test('filterTodos undefined returns []', () => {
  expect(filterTodos(undefined, Filters.All).length).toBe(0);
});
