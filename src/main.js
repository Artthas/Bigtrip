import TripTabsView from './view/trip-tabs.js';
import TripFiltersView from './view/trip-filters.js';
import TripMainView from './view/trip-main.js';
import TripMainEventAddBtnView from './view/trip-main-event-add-btn.js';
import TripControlsView from './view/trip-controls.js';
import TripControlsNavigationView from './view/trip-controls-navigation.js';
import TripControlsFiltersView from './view/trip-controls-filters.js';
import TripEventsPresenter from './presenter/trip-events.js';
import { generateTrip } from './mock/trip.js';
import { render, RenderPosition } from './utils/render.js';

const TRIP_COUNT = 15;

const trips = new Array(TRIP_COUNT).fill().map(generateTrip);

const pageHeaderContainer = document.querySelector('.page-header__container');
const pageMainContainer = document.querySelector('.page-main__container');

export const tripMainComponent = new TripMainView();
const tripControlsComponent = new TripControlsView();
const tripControlsNavigationComponent = new TripControlsNavigationView();
const tripControlsFiltersComponent = new TripControlsFiltersView();

render(pageHeaderContainer, tripMainComponent, RenderPosition.BEFOREEND);
render(tripMainComponent, tripControlsComponent, RenderPosition.BEFOREEND);
render(tripMainComponent, new TripMainEventAddBtnView(), RenderPosition.BEFOREEND);
render(tripControlsComponent, tripControlsNavigationComponent, RenderPosition.AFTERBEGIN);
render(tripControlsComponent, tripControlsFiltersComponent, RenderPosition.AFTERBEGIN);
render(tripControlsNavigationComponent, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripControlsFiltersComponent, new TripFiltersView(), RenderPosition.BEFOREEND);

const tripEventsPresenter = new TripEventsPresenter(pageMainContainer);

tripEventsPresenter.init(trips);
// Для коммита
