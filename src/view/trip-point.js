import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createTripEditOffers = (offers) => {
  const offersElements = offers !== null ? offers
    .map((item) => {
      if (item.isChecked === 'checked') {
        return `<li class="event__offer">
                  <span class="event__offer-title">${Object.keys(item)[0]}</span>
                    &plus;&euro;&nbsp;
                  <span class="event__offer-price">${Object.values(item)[0]}</span>
                </li>`;
      }
    })
    .join('') : '';
  return offers !== null ? `<ul class="event__selected-offers">${offersElements}</ul>` : '';
};

const createTripPoint = (trip) => {
  const {type, destination, startDate, endDate, duration, price, offers, isFavorite} = trip;

  const favorite = (isFavorite) ? 'event__favorite-btn--active' : '';

  const editOffers = createTripEditOffers(offers);

  return `<div class="event">
    <time class="event__date" datetime="2019-03-20">${dayjs(startDate).format('MMM D')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${Object.keys(type).find((key) => type[key] === 'checked').toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${Object.keys(type).find((key) => type[key] === 'checked')} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-20T08:25">${dayjs(startDate).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-20T09:25">${dayjs(endDate).format('HH:mm')}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${editOffers}
    <button class="event__favorite-btn ${favorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
};

export default class TripPoint extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._tripPointClickHandler = this._tripPointClickHandler.bind(this);
  }

  getTemplate() {
    return createTripPoint(this._trip);
  }

  _tripPointClickHandler(evt) {
    evt.preventDefault();
    this._callback.tripPointClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setTripPointClickHandler(callback) {
    this._callback.tripPointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._tripPointClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}

