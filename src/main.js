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
import { render, RenderPosition, replace } from './utils/render.js';

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

render(pageHeaderContainer, tripMainComponent, RenderPosition.BEFOREEND);
render(tripMainComponent, tripControlsComponent, RenderPosition.BEFOREEND);
render(tripMainComponent, new TripMainEventAddBtnView(), RenderPosition.BEFOREEND);
render(tripControlsComponent, tripControlsNavigationComponent, RenderPosition.AFTERBEGIN);
render(tripControlsComponent, tripControlsFiltersComponent, RenderPosition.AFTERBEGIN);

const renderPoint = (tripEventsListElement, trip) => {
  const tripPointComponent = new TripPointView(trip);
  const tripEditComponent = new TripEditView(trip);

  const replaceCardToForm = () => {
    replace(tripEditComponent, tripPointComponent);
  };

  const replaceFormToCard = () => {
    replace(tripPointComponent, tripEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.setTripPointClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setTripPointClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripEventsListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

if (trips.every((trip) => trip.isArchive)) {
  render(tripEventsComponent, new NoPointView(), RenderPosition.BEFOREEND);
} else {
  render(tripMainComponent, new TripInfoView(trips), RenderPosition.AFTERBEGIN);
  render(tripEventsComponent, new TripSortView(), RenderPosition.AFTERBEGIN);
  render(tripEventsListComponent, new TripCreateView(trips[1]), RenderPosition.BEFOREEND);
}

render(tripControlsNavigationComponent, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripControlsFiltersComponent, new TripFiltersView(), RenderPosition.BEFOREEND);
render(pageMainContainer, tripEventsComponent, RenderPosition.AFTERBEGIN);
render(tripEventsComponent, tripEventsListComponent, RenderPosition.BEFOREEND);

for (let i = 2; i < trips.length; i++) {
  renderPoint(tripEventsListComponent.getElement(), trips[i]);
}
