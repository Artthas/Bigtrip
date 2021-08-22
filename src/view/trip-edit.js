import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createTripEdit = (trip) => {
  const {type, destination, startDate, endDate, price, offers, description} = trip;

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
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
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${trip.id}" type="checkbox" name="event-offer-luggage" ${Object.values(offers[0])[1]}>
            <label class="event__offer-label" for="event-offer-luggage-${trip.id}">
              <span class="event__offer-title">${Object.keys(offers[0])[0]}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${Object.values(offers[0])[0]}</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${trip.id}" type="checkbox" name="event-offer-comfort" ${Object.values(offers[1])[1]}>
            <label class="event__offer-label" for="event-offer-comfort-${trip.id}">
              <span class="event__offer-title">${Object.keys(offers[1])[0]}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${Object.values(offers[1])[0]}</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${trip.id}" type="checkbox" name="event-offer-meal" ${Object.values(offers[2])[1]}>
            <label class="event__offer-label" for="event-offer-meal-${trip.id}">
              <span class="event__offer-title">${Object.keys(offers[2])[0]}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${Object.values(offers[2])[0]}</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${trip.id}" type="checkbox" name="event-offer-seats" ${Object.values(offers[3])[1]}>
            <label class="event__offer-label" for="event-offer-seats-${trip.id}">
              <span class="event__offer-title">${Object.keys(offers[3])[0]}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${Object.values(offers[3])[0]}</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-${trip.id}" type="checkbox" name="event-offer-train" ${Object.values(offers[4])[1]}>
            <label class="event__offer-label" for="event-offer-train-${trip.id}">
              <span class="event__offer-title">${Object.keys(offers[4])[0]}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${Object.values(offers[4])[0]}</span>
            </label>
          </div>
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      </section>
    </section>
  </form>`;
};

export default class TripEdit extends AbstractView {
  constructor(trip) {
    super();
    this._trip = trip;

    this._tripPointClickHandler = this._tripPointClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createTripEdit(this._trip);
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
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }
}

