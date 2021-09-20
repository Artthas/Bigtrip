import AbstractView from './abstract.js';
import {createElement} from '../utils/render.js';

const createTripMainEventAddBtn = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
    New event
  </button>`
);

export default class TripMainEventAddBtn extends AbstractView {
  constructor() {
    super();

    this._element = null;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createTripMainEventAddBtn();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}

