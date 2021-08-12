import AbstractView from './abstract.js';

const createTripControlsFilters = () => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <!-- Фильтры -->
  </div>`
);

export default class TripControlsFilters extends AbstractView {
  getTemplate() {
    return createTripControlsFilters();
  }
}
