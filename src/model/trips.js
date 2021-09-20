import AbstractObserver from '../utils/abstract-observer.js';

export default class Trips extends AbstractObserver {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(updateType, trips) {
    this._trips = trips.slice();

    this._notify(updateType);
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

  addTrip(updateType, update) {
    this._trips = [
      update,
      ...this._trips,
    ];

    this._notify(updateType, update);
  }

  deleteTrip(updateType, update) {
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

  static adaptToClient(trip) {
    const adaptedTrip = Object.assign(
      {},
      trip,
      {
        startDate: new Date(trip.date_from),
        endDate: new Date(trip.date_to),
        destinationTitle: trip.destination.name,
        description: trip.destination.description,
        photos: trip.destination.pictures,
        price: trip['base_price'],
        isFavorite: trip['is_favorite'],
      },
    );

    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];
    delete adaptedTrip.destination;
    delete adaptedTrip['base_price'];
    delete adaptedTrip['is_favorite'];

    return adaptedTrip;
  }

  static adaptToServer(trip) {
    const adaptedTrip = Object.assign(
      {},
      trip,
      {
        'date_from': trip.startDate instanceof Date ? trip.startDate.toISOString() : null,
        'date_to': trip.endDate instanceof Date ? trip.endDate.toISOString() : null,
        destination: {
          name: trip.destinationTitle,
          description: trip.description,
          pictures: trip.photos,
        },
        'base_price': trip.price,
        'is_favorite': trip.isFavorite,
      },
    );

    delete adaptedTrip.startDate;
    delete adaptedTrip.endDate;
    delete adaptedTrip.destinationTitle;
    delete adaptedTrip.description;
    delete adaptedTrip.photos;
    delete adaptedTrip._firstPrice;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  }
}
