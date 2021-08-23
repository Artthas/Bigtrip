import TripEventsView from '../view/trip-events.js';
import TripSortView from '../view/trip-sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import NoPointView from '../view/no-point.js';
import TripCreateView from '../view/trip-create.js';
import TripInfoView from '../view/trip-info.js';
import TripPointPresenter from './trip-point.js';
import { tripMainComponent } from '../main.js';
import { render, RenderPosition } from '../utils/render.js';
import { updateItem, sortByDay, sortByTime, sortByPrice, SortType } from '../utils/common.js';

export default class TripEvents {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._tripPointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._tripEventsComponent = new TripEventsView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();
    this._noPointComponent = new NoPointView();
    this._tripInfoComponent = new TripInfoView();
    this._tripMainComponent = tripMainComponent;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleTripPointChange = this._handleTripPointChange.bind(this);
  }

  init(tripEventsPoints) {
    this._tripEventsPoints = tripEventsPoints.slice();

    this._sourcedTripEventsPoints = tripEventsPoints.slice();

    this._tripEventsPoints.sort(sortByDay);

    render(this._tripEventsContainer, this._tripEventsComponent, RenderPosition.AFTERBEGIN);
    render(this._tripEventsComponent, this._tripEventsListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _handleModeChange() {
    this._tripPointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleTripPointChange(updatedTrip) {
    this._tripEventsPoints = updateItem(this._tripEventsPoints, updatedTrip);
    this._sourcedTripEventsPoints = updateItem(this._sourcedTripEventsPoints, updatedTrip);
    this._tripPointPresenter.get(updatedTrip.id).init(updatedTrip);
  }

  _renderTripInfo() {
    render(this._tripMainComponent, new TripInfoView(this._tripEventsPoints), RenderPosition.AFTERBEGIN);
  }

  _sortTrips(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._tripEventsPoints.sort(sortByDay);
        break;
      case SortType.TIME:
        this._tripEventsPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._tripEventsPoints.sort(sortByPrice);
        break;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTrips(sortType);
    this._clearTripPoints();
    this._renderTripPoints();
  }

  _renderTripSort() {
    render(this._tripEventsComponent, this._tripSortComponent, RenderPosition.AFTERBEGIN);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripCreate() {
    render(this._tripEventsListComponent, new TripCreateView(this._tripEventsPoints[1]), RenderPosition.BEFOREEND);
  }

  _renderTripPoint(trip) {
    const tripPointPresenter = new TripPointPresenter(this._tripEventsListComponent, this._handleTripPointChange, this._handleModeChange);
    tripPointPresenter.init(trip);
    this._tripPointPresenter.set(trip.id, tripPointPresenter);
  }

  _clearTripPoints() {
    this._tripPointPresenter.forEach((presenter) => presenter.destroy());
    this._tripPointPresenter.clear();
  }

  _renderTripPoints() {
    for (let i = 2; i < this._tripEventsPoints.length; i++) {
      this._renderTripPoint(this._tripEventsPoints[i]);
    }
  }

  _renderNoPoints() {
    render(this._tripEventsComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderTripEvents() {
    if (this._tripEventsPoints.every((point) => point.isArchive)) {
      this._renderNoPoints();
    } else {
      this._renderTripInfo();
      this._renderTripSort();
      this._renderTripCreate();
      this._renderTripPoints();
    }
  }
}
