import { createElement } from '../utils.js';

const createTripControlsFilters = () => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <!-- Фильтры -->
  </div>`
);

export default class TripControlsFilters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripControlsFilters();
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
