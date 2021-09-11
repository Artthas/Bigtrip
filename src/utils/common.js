import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDay = (tripA, tripB) => {
  const weight = getWeightForNullDate(tripA.startDate, tripB.startDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(tripA.startDate).diff(dayjs(tripB.startDate));
};

const sortByTime = (tripA, tripB) => {
  const durationOfTripA = tripA.endDate - tripA.startDate;
  const durationOfTripB = tripB.endDate - tripB.startDate;

  return dayjs(durationOfTripB).diff(dayjs(durationOfTripA));
};

const sortByPrice = (tripA, tripB) => tripB.price - tripA.price;

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
};

export {getRandomInteger, sortByDay, sortByTime, sortByPrice, SortType, UserAction, UpdateType};
