import dayjs from 'dayjs';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_TRIP = {
  startDate: new Date(),
  endDate: new Date(),
  type: 'taxi',
  destinationTitle: '',
  description: '',
  isFavorite: false,
  offers: [
    {title: 'Choose the radio station', price: 30},
    {title: 'Choose temperature', price: 170},
    {title: 'Drive quickly, I\'m in a hurry', price: 100},
    {title: 'Drive slowly', price: 110},
  ],
  photos: [],
  price: 400,
};

const createTripEditDestination = (description, photos) => {
  const isDescription = Boolean(description);
  return (Boolean(description) && Boolean(photos)) ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${isDescription ? description : ''}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">${photos}</div>
      </div>
    </section>` : '';
};

const createTripEditOffers = (offers, id, isDisabled) => {
  const offersElements = offers.length === 0 ? '' : offers
    .map((item) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.title.split(' ').join('-').toLowerCase()}-${id}" type="checkbox" name="event-offer-${item.title.split(' ').join('-').toLowerCase()}" ${item.price} ${item.isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${item.title.split(' ').join('-').toLowerCase()}-${id}">
          <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${item.price}</span>
        </label>
      </div>`)
    .join('');
  return offers.length === 0 ? '' :
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">${offersElements}</div>
    </section>`;
};

const createTripEdit = (data) => {
  const {type, destinationTitle, startDate, endDate, price, offers, description, photos, isDisabled, isSaving, isDeleting} = data;

  const newPhotos = Array.from(photos);

  const photosElements = newPhotos
    .map((item) => `<img class="event__photo" src="${Object.values(item)[0]}" alt="${Object.values(item)[1]}"></img>`)
    .join('');

  const editDestination = createTripEditDestination(description, photosElements);
  const editOffers = createTripEditOffers(offers, data.id, isDisabled);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${data.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${data.id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${data.id}">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-${data.id}">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-${data.id}">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-${data.id}">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-${data.id}">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-${data.id}">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${data.id}">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${data.id}">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-${data.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${data.id}">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${data.id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${data.id}" type="text" name="event-destination" value="${destinationTitle}" list="destination-list-${data.id}" ${isDisabled ? 'disabled' : ''}>
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
        <label class="visually-hidden" for="event-start-time-${data.id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${data.id}" type="text" name="event-start-time" value="${dayjs(startDate).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${data.id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${data.id}" type="text" name="event-end-time" value="${dayjs(endDate).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${data.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${data.id}" type="number" name="event-price" value="${price}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">
      ${isSaving ? 'Saving...' : 'Save'}
      </button>
      <button class="event__reset-btn" type="reset">
      ${isDeleting ? 'Deleting...' : 'Delete'}
      </button>
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
  constructor(destinations, offers, trip = BLANK_TRIP) {
    super();
    this._destinations = destinations;
    this._offers = offers;
    this._data = TripEdit.parseTripToData(trip);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._tripPointClickHandler = this._tripPointClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._offerToggleHandler = this._offerToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  getTemplate() {
    return createTripEdit(this._data, this._offers, this._destinations);
  }

  reset(trip) {
    this.updateData(
      TripEdit.parseTripToData(trip),
    );
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  _offerToggleHandler(evt) {
    const newOffers = this._data.offers.map((offer) => Object.assign({}, offer));
    newOffers.map((offer) => {
      if (`event-offer-${offer.title.split(' ').join('-').toLowerCase()}-${this._data.id}` === evt.target.getAttribute('for') || offer.title === evt.target.innerText) {
        offer.isChecked = !offer.isChecked;
      }
    });
    this.updateData(
      {
        offers: newOffers,
      },
    );
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    if (Number(evt.target.value) >= 0 && Number.isInteger(Number(evt.target.value))) {
      this.updateData({
        price: Number(evt.target.value),
      }, true);
    } else {
      this.getElement().querySelector('.event__input--price').setCustomValidity('Введите положительное целое число');
      this.getElement().querySelector('.event__input--price').reportValidity();
    }
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value;
    if (!type) {
      return;
    }
    const offers = this._offers.get(type);

    this.updateData(
      {
        offers,
        type,
      },
    );
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    const destinationTitle = evt.target.value;
    for (const destinationItem of this._destinations) {
      if (destinationItem.name === destinationTitle) {
        const destination = this._destinations.find((eachDestination) => destinationTitle === eachDestination.name);
        this.updateData({
          destinationTitle,
          description: destination.description,
          photos: destination.pictures,
        });
        return;
      }
    }
    this.getElement().querySelector('.event__input--destination').setCustomValidity('Введите пункт назначения из предложенных');
    this.getElement().querySelector('.event__input--destination').reportValidity();
  }

  _startDateChangeHandler([userStartDate]) {
    if ((this._data.endDate - userStartDate) > 0) {
      this.updateData({
        startDate: userStartDate,
      });
    } else {
      this.updateData({
        startDate: this._data.startDate,
      });
    }
  }

  _endDateChangeHandler([userEndDate]) {
    if ((userEndDate - this._data.startDate) >= 0) {
      this.updateData({
        endDate: userEndDate,
      });
    } else {
      this.updateData({
        endDate: this._data.endDate,
      });
    }
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
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeToggleHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('blur', this._destinationToggleHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('blur', this._priceInputHandler);
    if (this.getElement().querySelector('.event__available-offers')) {
      this.getElement().querySelector('.event__available-offers').addEventListener('click', this._offerToggleHandler);
    }
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(TripEdit.parseDataToTrip(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parseTripToData(trip) {
    return Object.assign(
      {},
      trip,
      {
        isOffers: trip.offers !== null,
        isDescription: trip.description !== null,
        isPhotos: trip.photos !== null,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
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
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}

