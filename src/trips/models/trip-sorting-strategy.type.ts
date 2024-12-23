export type TripSortingStrategy = 'cheapest' | 'shortest';

export const sortingFieldMap = {
  cheapest: 'cost',
  shortest: 'duration',
};
