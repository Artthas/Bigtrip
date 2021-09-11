import TripEventsView from '../view/trip-events.js';
import TripSortView from '../view/trip-sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import NoPointView from '../view/no-point.js';
import TripCreateView from '../view/trip-create.js';
import TripInfoView from '../view/trip-info.js';
import TripPointPresenter from './trip-point.js';
import { tripMainComponent } from '../main.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { sortByDay, sortByTime, sortByPrice, SortType, UpdateType, UserAction } from '../utils/common.js';

export default class TripEvents {
  constructor(tripEventsContainer, tripsModel) {
    this._tripEventsContainer = tripEventsContainer;
    this._tripsModel = tripsModel;
    this._tripPointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._tripSortComponent = null;
    this._tripInfoComponent = null;

    this._tripEventsComponent = new TripEventsView();
    this._tripEventsListComponent = new TripEventsListView();
    this._noPointComponent = new NoPointView();
    this._tripMainComponent = tripMainComponent;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModelChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._tripsModel.getTrips().slice().sort(sortByDay);

    render(this._tripEventsContainer, this._tripEventsComponent, RenderPosition.AFTERBEGIN);
    render(this._tripEventsComponent, this._tripEventsListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _getTrips() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._tripsModel.getTrips().slice().sort(sortByDay);
      case SortType.TIME:
        return this._tripsModel.getTrips().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._tripsModel.getTrips().slice().sort(sortByPrice);
    }

    return this._tripsModel.getTrips();
  }

  _handleModelChange() {
    this._tripPointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this._tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this._tripsModel.deleteTrip(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripEvents();
        this._renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this._clearTripEvents({resetSortType: true});
        this._renderTripEvents();
        break;
    }
  }

  _renderTripInfo(trips) {
    if (this._tripInfoComponent !== null) {
      this._tripInfoComponent = null;
    }

    this._tripInfoComponent = new TripInfoView(trips);

    render(this._tripMainComponent, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _handleSortTypeChange(sortType) {
    console.log(sortType);
    if (this._currentSortType === sortType) {
      return;
    }
    
    this._currentSortType = sortType;
    this._clearTripEvents();
    this._renderTripEvents();
  }

  _renderTripSort() {
    if (this._tripSortComponent !== null) {
      this._tripSortComponent = null;
    }

    this._tripSortComponent = new TripSortView(this._currentSortType);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripEventsComponent, this._tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripCreate() {
    render(this._tripEventsListComponent, new TripCreateView(this._getTrips()[0]), RenderPosition.BEFOREEND);
  }

  _renderTripPoint(trip) {
    const tripPointPresenter = new TripPointPresenter(this._tripEventsListComponent, this._handleViewAction, this._handleModeChange);
    tripPointPresenter.init(trip);
    this._tripPointPresenter.set(trip.id, tripPointPresenter);
  }

  _clearTripPoints() {
    this._tripPointPresenter.forEach((presenter) => presenter.destroy());
    this._tripPointPresenter.clear();
  }

  _renderTripPoints(trips) {
    trips.forEach((trip) => this._renderTripPoint(trip));
  }

  _renderNoPoints() {
    render(this._tripEventsComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderTripEvents() {
    const trips = this._getTrips();
    const tripCount = trips.length;

    if (tripCount === 0) {
      this._renderNoPoints();
      return;
    } else {
      this._renderTripInfo(trips);
      this._renderTripSort();
      this._renderTripPoints(trips);
    }
  }

  _clearTripEvents({resetSortType = false} = {}) {
    this._tripPointPresenter.forEach((presenter) => presenter.destroy());
    this._tripPointPresenter.clear();

    remove(this._tripInfoComponent);
    remove(this._tripSortComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }
}
