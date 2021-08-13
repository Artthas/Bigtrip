import AbstractView from './abstract.js';

const createTripEventsList = () => (
  `<ul class="trip-events__list">
    <!-- Контент -->
  </ul>`
);

export default class TripEventsList extends AbstractView {
  getTemplate() {
    return createTripEventsList();
  }
}

