const SortType = {
  DAY: 'DAY',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

const UserAction = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

const MenuItem = {
  ADD_EVENT: 'ADD EVENT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export {SortType, UserAction, UpdateType, FilterType, MenuItem};
