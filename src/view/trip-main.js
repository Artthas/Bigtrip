import AbstractView from './abstract.js';

const createTripMain = () => (
  `<div class="trip-main">
    <!-- Маршрут и стоимость -->
  </div>`
);

export default class TripMain extends AbstractView {
  getTemplate() {
    return createTripMain();
  }
}

