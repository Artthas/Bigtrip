import AbstractView from './abstract.js';

const createTripTabs = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-title="TABLE">Table</a>
    <a class="trip-tabs__btn" href="#" data-title="STATS">Stats</a>
  </nav>`
);

export default class TripTabs extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createTripTabs();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.title);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const prevItem = this.getElement().querySelector('.trip-tabs__btn--active');
    const item = this.getElement().querySelector(`[data-title='${menuItem}']`);

    if (item !== null) {
      prevItem.classList.remove('trip-tabs__btn--active');
      item.classList.add('trip-tabs__btn--active');
    }
  }
}

