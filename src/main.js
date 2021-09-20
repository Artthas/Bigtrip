import TripTabsView from './view/trip-tabs.js';
import TripMainView from './view/trip-main.js';
import TripMainEventAddBtnView from './view/trip-main-event-add-btn.js';
import TripControlsView from './view/trip-controls.js';
import StatsView from './view/stats.js';
import TripControlsNavigationView from './view/trip-controls-navigation.js';
import TripControlsFiltersView from './view/trip-controls-filters.js';
import TripEventsPresenter from './presenter/trip-events.js';
import FilterPresenter from './presenter/filter.js';
import TripsModel from './model/trips.js';
import DataModel from './model/data.js';
import FilterModel from './model/filter.js';
import { render, RenderPosition, remove } from './utils/render.js';
import { MenuItem, UpdateType, FilterType } from './utils/const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic gy2nbq455jh3zlb4';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const pageHeaderContainer = document.querySelector('.page-header__container');
const pageMainContainer = document.querySelector('.page-main__container');
const pageBodyContainerAfter = document.querySelectorAll('.page-body__container-after');

const filterModel = new FilterModel();

export const tripMainComponent = new TripMainView();
const tripControlsComponent = new TripControlsView();
const tripControlsNavigationComponent = new TripControlsNavigationView();
const tripControlsFiltersComponent = new TripControlsFiltersView();
const newEvtBtn = new TripMainEventAddBtnView();
const tripTabsComponent = new TripTabsView();
const tripsModel = new TripsModel();
const dataModel = new DataModel();

const api = new Api(dataModel, END_POINT, AUTHORIZATION);

let statsComponent = null;

const tripEventsPresenter = new TripEventsPresenter(pageMainContainer, tripsModel, dataModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControlsFiltersComponent, filterModel, tripsModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      pageBodyContainerAfter[0].classList.remove('visually-hidden');
      pageBodyContainerAfter[1].classList.remove('visually-hidden');
      remove(statsComponent);
      tripEventsPresenter.destroy();
      tripEventsPresenter.removeTripInfo();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripTabsComponent.setMenuItem(menuItem);
      tripEventsPresenter.init();
      break;
    case MenuItem.STATS:
      pageBodyContainerAfter[0].classList.add('visually-hidden');
      pageBodyContainerAfter[1].classList.add('visually-hidden');
      tripTabsComponent.setMenuItem(menuItem);
      filterModel.setFilter(UpdateType.MAJOR, 'disabled');
      statsComponent = new StatsView(tripsModel.getTrips());
      render(pageMainContainer, statsComponent, RenderPosition.BEFOREEND);
      tripEventsPresenter.destroy();
      tripEventsPresenter.renderTripInfo(tripsModel.getTrips());
      break;
  }
};

const handleNewEvtBtnClick = () => {
  pageBodyContainerAfter[0].classList.remove('visually-hidden');
  pageBodyContainerAfter[1].classList.remove('visually-hidden');
  remove(statsComponent);
  tripEventsPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripEventsPresenter.init();
  tripTabsComponent.setMenuItem(MenuItem.TABLE);
  tripEventsPresenter.createTrip(newEvtBtn);
};

filterPresenter.init();
tripEventsPresenter.init();

api.getPoints()
  .then((points) => {
    tripsModel.setTrips(UpdateType.INIT, points);
    render(pageHeaderContainer, tripMainComponent, RenderPosition.BEFOREEND);
    render(tripMainComponent, tripControlsComponent, RenderPosition.BEFOREEND);
    render(tripMainComponent, newEvtBtn, RenderPosition.BEFOREEND);
    render(tripControlsComponent, tripControlsNavigationComponent, RenderPosition.AFTERBEGIN);
    render(tripControlsComponent, tripControlsFiltersComponent, RenderPosition.BEFOREEND);
    render(tripControlsNavigationComponent, tripTabsComponent, RenderPosition.AFTERBEGIN);
    newEvtBtn.setMenuClickHandler(handleNewEvtBtnClick);
    tripTabsComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    tripsModel.setTrips(UpdateType.INIT, []);
    render(pageHeaderContainer, tripMainComponent, RenderPosition.BEFOREEND);
    render(tripMainComponent, tripControlsComponent, RenderPosition.BEFOREEND);
    render(tripMainComponent, newEvtBtn, RenderPosition.BEFOREEND);
    render(tripControlsComponent, tripControlsNavigationComponent, RenderPosition.AFTERBEGIN);
    render(tripControlsComponent, tripControlsFiltersComponent, RenderPosition.BEFOREEND);
    render(tripControlsNavigationComponent, tripTabsComponent, RenderPosition.AFTERBEGIN);
    newEvtBtn.setMenuClickHandler(handleNewEvtBtnClick);
    tripTabsComponent.setMenuClickHandler(handleSiteMenuClick);
  });
