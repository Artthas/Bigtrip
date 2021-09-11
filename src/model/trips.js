import AbstractObserver from '../utils/abstract-observer.js';

export default class Trips extends AbstractObserver {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(trips) {
    this._trips = trips.slice();
  }

  getTrips() {
    return this._trips;
  }

  updateTrip(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }

    this._trips = [
      ...this._trips.slice(0, index),
      update,
      ...this._trips.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTask(updateType, update) {
    this._trips = [
      update,
      ...this._trips,
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._trips = [
      ...this._trips.slice(0, index),
      ...this._trips.slice(index + 1),
    ];

    this._notify(updateType);
  }
}