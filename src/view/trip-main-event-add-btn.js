import AbstractView from './abstract.js';

const createTripMainEventAddBtn = () => (
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
    New event
  </button>`
);

export default class TripMainEventAddBtn extends AbstractView {
  getTemplate() {
    return createTripMainEventAddBtn();
  }
}

