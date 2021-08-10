import { createElement } from '../utils.js';

const createTripEvents = () => (
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <!-- Сортировка -->
    <ul class="trip-events__list"><!-- Контент --></ul>

  </section>`
);

export default class TripEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEvents();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
