import { createElement } from '../utils.js';

const createTripControls = () => (
  `<div class="trip-main__trip-controls  trip-controls">
  </div>`
);

export default class TripControls {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripControls();
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
