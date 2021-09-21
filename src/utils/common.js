import dayjs from 'dayjs';

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

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

export {sortByDay, sortByTime, sortByPrice, isEscEvent};
