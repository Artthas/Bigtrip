import { createElement } from '../utils.js';

const createTripMain = () => (
  `<div class="trip-main">
    <!-- Маршрут и стоимость -->
  </div>`
);

export default class TripMain {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripMain();
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
