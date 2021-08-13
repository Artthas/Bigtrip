import AbstractView from './abstract.js';

const createTripEvents = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <!-- Сортировка -->
    <ul class="trip-events__list"><!-- Контент --></ul>

  </section>`
);

export default class TripEvents extends AbstractView {
  getTemplate() {
    return createTripEvents();
  }
}

