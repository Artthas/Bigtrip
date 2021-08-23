import AbstractView from './abstract.js';

const createTripEvents = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    <ul class="trip-events__list"></ul>
  </section>`
);

export default class TripEvents extends AbstractView {
  getTemplate() {
    return createTripEvents();
  }
}

