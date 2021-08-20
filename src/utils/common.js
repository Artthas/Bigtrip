import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomIntegerEveryFive = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 5));
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
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

export {getRandomInteger, getRandomIntegerEveryFive, updateItem, sortByDay, sortByTime, sortByPrice, SortType};
