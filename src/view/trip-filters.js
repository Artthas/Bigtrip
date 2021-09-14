import AbstractView from './abstract.js';
import { FilterType } from '../utils/const.js';

const createTripFilters = (currentFilterType) => {
  let isCheckedEverything = '';
  let isCheckedFuture = '';
  let isCheckedPast = '';
  if (currentFilterType === FilterType.EVERYTHING) {
    isCheckedEverything = 'checked';
  } else if (currentFilterType === FilterType.FUTURE) {
    isCheckedFuture = 'checked';
  } else if (currentFilterType === FilterType.PAST) {
    isCheckedPast = 'checked';
  } else if (currentFilterType === 'disabled') {
    isCheckedEverything = 'disabled';
    isCheckedFuture = 'disabled';
    isCheckedPast = 'disabled';
  }
  return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isCheckedEverything}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${isCheckedFuture}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${isCheckedPast}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class TripFilters extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFilters(this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value.toUpperCase());
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
