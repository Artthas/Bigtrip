import { createTripTabs } from './view/trip-tabs.js';
import { createTripInfo } from './view/trip-info.js';
import { createTripFilters } from './view/trip-filters.js';
import { createTripSort } from './view/trip-sort.js';
import { createTripCreate } from './view/trip-create.js';
import { createTripEdit } from './view/trip-edit.js';
import { createTripPoint } from './view/trip-point.js';
import { createTripMain } from './view/trip-main.js';
import { createTripMainEventAddBtn } from './view/trip-main-event-add-btn.js';
import { createTripControls } from './view/trip-controls.js';
import { createTripControlsNavigation } from './view/trip-controls-navigation.js';
import { createTripControlsFilters } from './view/trip-controls-filters.js';
import { createTripEvents } from './view/trip-events.js';
import { createTripEventsList } from './view/trip-events-list.js';
import { generateTrip } from './mock/trip.js';

const TRIP_COUNT = 15;

const trips = new Array(TRIP_COUNT).fill().map(generateTrip);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeaderContainer = document.querySelector('.page-header__container');
const pageMainContainer = document.querySelector('.page-main__container');

render(pageHeaderContainer, createTripMain(), 'beforeend');

const tripMain = document.querySelector('.trip-main');

render(tripMain, createTripControls(), 'beforeend');
render(tripMain, createTripMainEventAddBtn(), 'beforeend');

const tripControls = document.querySelector('.trip-controls');

render(tripControls, createTripControlsNavigation(), 'afterbegin');
render(tripControls, createTripControlsFilters(), 'afterbegin');

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');

render(tripControlsNavigation, createTripTabs(), 'beforeend');
render(tripMain, createTripInfo(trips), 'afterbegin');

const tripControlsFilters = document.querySelector('.trip-controls__filters');

render(tripControlsFilters, createTripFilters(), 'beforeend');
render(pageMainContainer, createTripEvents(), 'afterbegin');

const tripEvents = document.querySelector('.trip-events');

render(tripEvents, createTripSort(), 'afterbegin');
render(tripEvents, createTripEventsList(), 'beforeend');

const tripEventsList = document.querySelector('.trip-events__list');

render(tripEventsList, createTripEdit(trips[0]), 'beforeend');
render(tripEventsList, createTripCreate(trips[1]), 'beforeend');

for (let i = 2; i < trips.length; i++) {
  render(tripEventsList, createTripPoint(trips[i]), 'beforeend');
}
