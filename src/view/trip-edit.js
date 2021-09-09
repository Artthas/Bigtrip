import dayjs from 'dayjs';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createTripEditDestination = (description, photos, isDescription, isPhotos) => (
  (isDescription || isPhotos) ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${isDescription ? description : ''}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">${photos}</div>
      </div>
    </section>` : ''
);

const createTripEditOffers = (offers, id) => {
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

const createTripEdit = (data) => {
  const {type, destination, startDate, endDate, price, offers, description, photos, isDescription, isPhotos} = data;

  const newPhotos = Array.from(photos);

  const photosElements = newPhotos
    .map((item) => `<img class="event__photo" src="${Object.values(item)[0]}" alt="${Object.keys(item)[0]}"></img>`)
    .join('');

  const editDestination = createTripEditDestination(description, photosElements, isDescription, isPhotos);
  const editOffers = createTripEditOffers(offers, data.id);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${data.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${Object.keys(type).find((key) => type[key] === 'checked').toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${data.id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[0].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[0].toLowerCase()}" ${Object.values(type)[0]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[0].toLowerCase()}" for="event-type-${Object.keys(type)[0].toLowerCase()}-${data.id}">${Object.keys(type)[0]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[1].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[1].toLowerCase()}" ${Object.values(type)[1]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[1].toLowerCase()}" for="event-type-${Object.keys(type)[1].toLowerCase()}-${data.id}">${Object.keys(type)[1]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[2].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[2].toLowerCase()}" ${Object.values(type)[2]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[2].toLowerCase()}" for="event-type-${Object.keys(type)[2].toLowerCase()}-${data.id}">${Object.keys(type)[2]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[3].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[3].toLowerCase()}" ${Object.values(type)[3]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[3].toLowerCase()}" for="event-type-${Object.keys(type)[3].toLowerCase()}-${data.id}">${Object.keys(type)[3]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[4].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[4].toLowerCase()}" ${Object.values(type)[4]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[4].toLowerCase()}" for="event-type-${Object.keys(type)[4].toLowerCase()}-${data.id}">${Object.keys(type)[4]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[5].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[5].toLowerCase()}" ${Object.values(type)[5]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[5].toLowerCase()}" for="event-type-${Object.keys(type)[5].toLowerCase()}-${data.id}">${Object.keys(type)[5]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[6].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[6].toLowerCase()}" ${Object.values(type)[6]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[6].toLowerCase()}" for="event-type-${Object.keys(type)[6].toLowerCase()}-${data.id}">${Object.keys(type)[6]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[7].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[7].toLowerCase()}" ${Object.values(type)[7]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[7].toLowerCase()}" for="event-type-${Object.keys(type)[7].toLowerCase()}-${data.id}">${Object.keys(type)[7]}</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-${Object.keys(type)[8].toLowerCase()}-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${Object.keys(type)[8].toLowerCase()}" ${Object.values(type)[8]}>
              <label class="event__type-label  event__type-label--${Object.keys(type)[8].toLowerCase()}" for="event-type-${Object.keys(type)[8].toLowerCase()}-${data.id}">${Object.keys(type)[8]}</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${data.id}">
          ${Object.keys(type).find((key) => type[key] === 'checked')}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${data.id}" type="text" name="event-destination" value="${destination}" list="destination-list-${data.id}">
        <datalist id="destination-list-${data.id}">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Helsinki"></option>
          <option value="Oslo"></option>
          <option value="Kopenhagen"></option>
          <option value="Den Haag"></option>
          <option value="Rotterdam"></option>
          <option value="Saint Petersburg"></option>
          <option value="Moscow"></option>
          <option value="Sochi"></option>
          <option value="Tokio"></option>
          <option value="Kioto"></option>
          <option value="Nagasaki"></option>
          <option value="Hiroshima"></option>
          <option value="Berlin"></option>
          <option value="Munich"></option>
          <option value="Frankfurt"></option>
          <option value="Vien"></option>
          <option value="Rome"></option>
          <option value="Naples"></option>
          <option value="Venice"></option>
          <option value="Milan"></option>
          <option value="Monaco"></option>
          <option value="Paris"></option>
          <option value="Barcelona"></option>
          <option value="Valencia"></option>
          <option value="Madrid"></option>
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
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${editOffers}
      ${editDestination}
    </section>
  </form>`;
};

export default class TripEdit extends SmartView {
  constructor(trip) {
    super();
    this._data = TripEdit.parseTripToData(trip);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._tripPointClickHandler = this._tripPointClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  getTemplate() {
    return createTripEdit(this._data);
  }

  reset(trip) {
    this.updateData(
      TripEdit.parseTripToData(trip),
    );
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    const type = Object.assign({}, this._data.type);
    let offers = Object.assign({}, this._data.offers);
    type[Object.keys(type).find((key) => type[key] === 'checked')] = '';
    evt.target.value = evt.target.value[0].toUpperCase() + evt.target.value.substring(1);
    type[evt.target.value] = 'checked';
    offers = this._data._offers[Object.keys(type).find((key) => type[key] === 'checked')];
    this.updateData({type, offers});
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    const destination = evt.target.value;
    this.updateData({
      destination,
      description: this._data._description[destination],
      photos: this._data._photos[destination],
    });
  }

  _startDateChangeHandler([userStartDate]) {
    this.updateData({
      startDate: userStartDate,
    });
  }

  _endDateChangeHandler([userEndDate]) {
    this.updateData({
      endDate: userEndDate,
    });
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('input[name = "event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.startDate,
        onChange: this._startDateChangeHandler,
      },
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('input[name = "event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.endDate,
        onChange: this._endDateChangeHandler,
      },
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setTripPointClickHandler(this._callback.tripPointClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeToggleHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationToggleHandler);
  }

  _tripPointClickHandler(evt) {
    evt.preventDefault();
    this._callback.tripPointClick();
  }

  setTripPointClickHandler(callback) {
    this._callback.tripPointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._tripPointClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEdit.parseDataToTrip(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  static parseTripToData(trip) {
    return Object.assign(
      {},
      trip,
      {
        isOffers: trip.offers !== null,
        isDescription: trip.description !== null,
        isPhotos: trip.photos !== null,
      },
    );
  }

  static parseDataToTrip(data) {
    data = Object.assign({}, data);

    if (!data.isOffers) {
      data.offers = null;
    }
    if (!data.isDescription) {
      data.description = null;
    }
    if (!data.isPhotos) {
      data.photos = null;
    }

    delete data.isOffers;
    delete data.isDescription;
    delete data.isPhotos;

    return data;
  }
}

