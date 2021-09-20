import TripEventsView from '../view/trip-events.js';
import TripSortView from '../view/trip-sort.js';
import TripEventsListView from '../view/trip-events-list.js';
import NoPointView from '../view/no-point.js';
import TripInfoView from '../view/trip-info.js';
import LoadingView from '../view/loading.js';
import TripPointPresenter, {State as TripPointPresenterViewState} from './trip-point.js';
import TripNewPresenter from './trip-new.js';
import { tripMainComponent } from '../main.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/common.js';
import { SortType, UpdateType, UserAction, FilterType } from '../utils/const.js';
import { filter } from '../utils/filter.js';

export default class TripEvents {
  constructor(tripEventsContainer, tripsModel, dataModel, filterModel, api) {
    this._tripEventsContainer = tripEventsContainer;
    this._tripsModel = tripsModel;
    this._dataModel = dataModel,
    this._filterModel = filterModel;
    this._tripPointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY;
    this._isLoading = true;
    this._api = api;

    this._api.getData();

    this._tripSortComponent = null;
    this._tripInfoComponent = null;
    this._noPointComponent = null;

    this._tripEventsComponent = new TripEventsView();
    this._tripEventsListComponent = new TripEventsListView();
    this._tripMainComponent = tripMainComponent;
    this._loadingComponent = new LoadingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripNewPresenter = new TripNewPresenter(this._tripEventsListComponent, this._handleViewAction, this._dataModel);
  }

  init() {
    render(this._tripEventsContainer, this._tripEventsComponent, RenderPosition.AFTERBEGIN);
    render(this._tripEventsComponent, this._tripEventsListComponent, RenderPosition.BEFOREEND);

    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTripEvents();
  }

  destroy() {
    this._clearTripEvents({resetSortType: true});

    remove(this._tripEventsListComponent);
    remove(this._tripEventsComponent);

    this._tripsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  renderTripInfo(trips) {
    this._renderTripInfo(trips);
  }

  removeTripInfo() {
    remove(this._tripInfoComponent);
  }

  createTrip(btn) {
    btn.getElement().setAttribute('disabled', 'disabled');
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._tripNewPresenter.init(btn);
  }

  _getTrips() {
    this._filterType = this._filterModel.getFilter();
    if (this._filterType === 'disabled') {
      return;
    }
    const trips = this._tripsModel.getTrips();
    const filtredTrips = filter[this._filterType](trips);

    switch (this._currentSortType) {
      case SortType.DAY:
        if (this._filterType === 'EVERYTHING') {
          return trips.sort(sortByDay);
        } else {
          return filtredTrips.sort(sortByDay);
        }
      case SortType.TIME:
        if (this._filterType === 'EVERYTHING') {
          return trips.sort(sortByTime);
        } else {
          return filtredTrips.sort(sortByTime);
        }
      case SortType.PRICE:
        if (this._filterType === 'EVERYTHING') {
          return trips.sort(sortByPrice);
        } else {
          return filtredTrips.sort(sortByPrice);
        }
    }

    if (this._filterType === FilterType.EVERYTHING) {
      return trips;
    } else {
      return filtredTrips;
    }
  }

  _handleModelChange() {
    this._tripNewPresenter.destroy();
    this._tripPointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._tripPointPresenter.get(update.id).setViewState(TripPointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._tripsModel.updateTrip(updateType, response);
          })
          .catch(() => {
            this._tripPointPresenter.get(update.id).setViewState(TripPointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_TRIP:
        this._tripNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._tripsModel.addTrip(updateType, response);
          })
          .catch(() => {
            this._tripNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_TRIP:
        this._tripPointPresenter.get(update.id).setViewState(TripPointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._tripsModel.deleteTrip(updateType, update);
          })
          .catch(() => {
            this._tripPointPresenter.get(update.id).setViewState(TripPointPresenterViewState.ABORTING);
          });
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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

  _renderTripPoint(trip) {
    const tripPointPresenter = new TripPointPresenter(this._tripEventsListComponent, this._handleViewAction, this._handleModelChange, this._dataModel);
    tripPointPresenter.init(this._dataModel, trip);
    this._tripPointPresenter.set(trip.id, tripPointPresenter);
  }

  _renderTripPoints(trips) {
    trips.forEach((trip) => this._renderTripPoint(trip));
  }

  _renderLoading() {
    render(this._tripEventsComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    this._noPointComponent = new NoPointView(this._filterType);
    render(this._tripEventsComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderTripEvents() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const trips = this._getTrips();
    if (trips === undefined) {
      return;
    }
    const tripCount = trips.length;

    if (tripCount === 0) {
      this._renderNoPoints();
    } else {
      this._renderTripInfo(trips);
      this._renderTripSort();
      this._renderTripPoints(trips);
    }
  }

  _clearTripEvents({resetSortType = false} = {}) {
    this._tripNewPresenter.destroy();
    this._tripPointPresenter.forEach((presenter) => presenter.destroy());
    this._tripPointPresenter.clear();

    remove(this._tripInfoComponent);
    remove(this._tripSortComponent);
    remove(this._loadingComponent);

    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }
}
