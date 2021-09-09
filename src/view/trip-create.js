import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createTripCreateOffers = (offers, id) => {
  const offersElements = offers !== null ? offers
    .map((item) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${Object.keys(item)[0]}-${id}" type="checkbox" name="event-offer-${Object.keys(item)[0]}" ${Object.values(item)[1]}>
        <label class="event__offer-label" for="event-offer-${Object.keys(item)[0]}-${id}">
          <span class="event__offer-title">${Object.keys(item)[0]}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${Object.values(item)[0]}</span>
        </label>
      </div>`)
    .join('') : '';
  return offers !== null ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">${offersElements}</div>
    </section>` : '';
};

const createTripCreate = (trip) => {
  const {type, destination, startDate, endDate, price, offers, description, photos} = trip;

  const newPhotos = Array.from(photos);

  const photosElements = newPhotos
    .map((item) => `<img class="event__photo" src="${Object.values(item)[0]}" alt="${Object.keys(item)[0]}"></img>`)
    .join('');

  const createOffers = createTripCreateOffers(offers, trip.id);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="../img/icons/${Object.keys(type).find((key) => type[key] === 'checked').toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[0].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[0].toLowerCase()}" ${Object.values(type)[0]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[0].toLowerCase()}" for="event-type-${Object.keys(type)[0].toLowerCase()}-1">${Object.keys(type)[0]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[1].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[1].toLowerCase()}" ${Object.values(type)[1]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[1].toLowerCase()}" for="event-type-${Object.keys(type)[1].toLowerCase()}-1">${Object.keys(type)[1]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[2].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[2].toLowerCase()}" ${Object.values(type)[2]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[2].toLowerCase()}" for="event-type-${Object.keys(type)[2].toLowerCase()}-1">${Object.keys(type)[2]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[3].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[3].toLowerCase()}" ${Object.values(type)[3]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[3].toLowerCase()}" for="event-type-${Object.keys(type)[3].toLowerCase()}-1">${Object.keys(type)[3]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[4].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[4].toLowerCase()}" ${Object.values(type)[4]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[4].toLowerCase()}" for="event-type-${Object.keys(type)[4].toLowerCase()}-1">${Object.keys(type)[4]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[5].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[5].toLowerCase()}" ${Object.values(type)[5]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[5].toLowerCase()}" for="event-type-${Object.keys(type)[5].toLowerCase()}-1">${Object.keys(type)[5]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[6].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[6].toLowerCase()}" ${Object.values(type)[6]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[6].toLowerCase()}" for="event-type-${Object.keys(type)[6].toLowerCase()}-1">${Object.keys(type)[6]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[7].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[7].toLowerCase()}" ${Object.values(type)[7]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[7].toLowerCase()}" for="event-type-${Object.keys(type)[7].toLowerCase()}-1">${Object.keys(type)[7]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[8].toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[8].toLowerCase()}" ${Object.values(type)[8]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[8].toLowerCase()}" for="event-type-${Object.keys(type)[8].toLowerCase()}-1">${Object.keys(type)[8]}</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${Object.keys(type).find((key) => type[key] === 'checked')}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(startDate).format('DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(endDate).format('DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      ${createOffers}

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">${photosElements}</div>
        </div>
      </section>
    </section>
  </form>`;
};

export default class TripCreate extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;
  }

  getTemplate() {
    return createTripCreate(this._trip);
  }
}
