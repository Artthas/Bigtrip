import dayjs from 'dayjs';
import {FilterType} from './const';

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips.filter((trip) => trip),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => trip.startDate === null ? false : dayjs().isBefore(trip.startDate, 'D') || dayjs().isBefore(trip.endDate, 'D')),
  [FilterType.PAST]: (trips) => trips.filter((trip) => trip.startDate === null ? false : dayjs().isAfter(trip.startDate, 'D') || dayjs().isAfter(trip.endDate, 'D')),
};
