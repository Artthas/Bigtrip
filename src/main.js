import TripTabsView from './view/trip-tabs.js';
import TripInfoView from './view/trip-info.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripCreateView from './view/trip-create.js';
import TripEditView from './view/trip-edit.js';
import TripPointView from './view/trip-point.js';
import TripMainView from './view/trip-main.js';
import TripMainEventAddBtnView from './view/trip-main-event-add-btn.js';
import TripControlsView from './view/trip-controls.js';
import TripControlsNavigationView from './view/trip-controls-navigation.js';
import TripControlsFiltersView from './view/trip-controls-filters.js';
import TripEventsView from './view/trip-events.js';
import TripEventsListView from './view/trip-events-list.js';
import NoPointView from './view/no-point.js';
import { generateTrip } from './mock/trip.js';
import { render, RenderPosition } from './utils.js';

const TRIP_COUNT = 15;

const trips = new Array(TRIP_COUNT).fill().map(generateTrip);

const pageHeaderContainer = document.querySelector('.page-header__container');
const pageMainContainer = document.querySelector('.page-main__container');

const tripMainComponent = new TripMainView();
const tripControlsComponent = new TripControlsView();
const tripEventsComponent = new TripEventsView();
const tripEventsListComponent = new TripEventsListView();
const tripControlsNavigationComponent = new TripControlsNavigationView();
const tripControlsFiltersComponent = new TripControlsFiltersView();

render(pageHeaderContainer, tripMainComponent.getElement(), RenderPosition.BEFOREEND);
render(tripMainComponent.getElement(), tripControlsComponent.getElement(), RenderPosition.BEFOREEND);
render(tripMainComponent.getElement(), new TripMainEventAddBtnView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsComponent.getElement(), tripControlsNavigationComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsComponent.getElement(), tripControlsFiltersComponent.getElement(), RenderPosition.AFTERBEGIN);

const renderPoint = (tripEventsListElement, trip) => {
  const tripPointComponent = new TripPointView(trip);
  const tripEditComponent = new TripEditView(trip);

  const replaceCardToForm = () => {
    tripEventsListElement.replaceChild(tripEditComponent.getElement(), tripPointComponent.getElement());
  };

  const replaceFormToCard = () => {
    tripEventsListElement.replaceChild(tripPointComponent.getElement(), tripEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripEventsListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

if (trips.every((trip) => trip.isArchive)) {
  render(tripEventsComponent.getElement(), new NoPointView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripMainComponent.getElement(), new TripInfoView(trips).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsComponent.getElement(), new TripSortView().getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsListComponent.getElement(), new TripCreateView(trips[1]).getElement(), RenderPosition.BEFOREEND);
}

render(tripControlsNavigationComponent.getElement(), new TripTabsView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFiltersComponent.getElement(), new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
render(pageMainContainer, tripEventsComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripEventsComponent.getElement(), tripEventsListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 2; i < trips.length; i++) {
  renderPoint(tripEventsListComponent.getElement(), trips[i]);
}
// Fake changes