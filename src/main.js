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
import FilterModel from './model/filter.js';
import { generateTrip } from './mock/trip.js';
import { render, RenderPosition, remove } from './utils/render.js';
import { MenuItem, UpdateType, FilterType } from './utils/const.js';

const TRIP_COUNT = 30;

const trips = new Array(TRIP_COUNT).fill().map(generateTrip);

const pageHeaderContainer = document.querySelector('.page-header__container');
const pageMainContainer = document.querySelector('.page-main__container');
const pageBodyContainerAfter = document.querySelectorAll('.page-body__container-after');

const filterModel = new FilterModel();

export const tripMainComponent = new TripMainView();
const tripControlsComponent = new TripControlsView();
const tripControlsNavigationComponent = new TripControlsNavigationView();
const tripControlsFiltersComponent = new TripControlsFiltersView();
const tripTabsComponent = new TripTabsView();
const tripsModel = new TripsModel();

tripsModel.setTrips(trips);

let statsComponent = null;

render(pageHeaderContainer, tripMainComponent, RenderPosition.BEFOREEND);
render(tripMainComponent, tripControlsComponent, RenderPosition.BEFOREEND);
render(tripMainComponent, new TripMainEventAddBtnView(), RenderPosition.BEFOREEND);
render(tripControlsComponent, tripControlsNavigationComponent, RenderPosition.AFTERBEGIN);
render(tripControlsComponent, tripControlsFiltersComponent, RenderPosition.BEFOREEND);
render(tripControlsNavigationComponent, tripTabsComponent, RenderPosition.AFTERBEGIN);

const tripEventsPresenter = new TripEventsPresenter(pageMainContainer, tripsModel, filterModel);
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
      tripEventsPresenter.init(trips);
      break;
    case MenuItem.STATS:
      pageBodyContainerAfter[0].classList.add('visually-hidden');
      pageBodyContainerAfter[1].classList.add('visually-hidden');
      tripTabsComponent.setMenuItem(menuItem);
      filterModel.setFilter(UpdateType.MAJOR, 'disabled');
      statsComponent = new StatsView(tripsModel.getTrips());
      render(pageMainContainer, statsComponent, RenderPosition.BEFOREEND);
      tripEventsPresenter.destroy();
      tripEventsPresenter.renderTripInfo(trips);
      break;
  }
};

tripTabsComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripEventsPresenter.init(trips);

const newEventBtn = document.querySelector('.trip-main__event-add-btn');

newEventBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  pageBodyContainerAfter[0].classList.remove('visually-hidden');
  pageBodyContainerAfter[1].classList.remove('visually-hidden');
  remove(statsComponent);
  tripEventsPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripEventsPresenter.init(trips);
  tripTabsComponent.setMenuItem(MenuItem.TABLE);
  tripEventsPresenter.createTrip(newEventBtn);
});
