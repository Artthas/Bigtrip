import { createTripTabs } from './view/trip-tabs.js';
import { createTripInfo } from './view/trip-info.js';
import { createTripFilters } from './view/trip-filters.js';
import { createTripSort } from './view/trip-sort.js';
import { createTripCreate } from './view/trip-create.js';
import { createTripEdit } from './view/trip-edit.js';
import { createTripPoint } from './view/trip-point.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripEventsList = document.querySelector('.trip-events__list');

render(tripControlsNavigation, createTripTabs(), 'beforeend');
render(tripMain, createTripInfo(), 'afterbegin');
render(tripControlsFilters, createTripFilters(), 'beforeend');
render(tripEvents, createTripSort(), 'afterbegin');
render(tripEventsList, createTripEdit(), 'beforeend');
render(tripEventsList, createTripCreate(), 'beforeend');
render(tripEventsList, createTripPoint(), 'beforeend');
render(tripEventsList, createTripPoint(), 'beforeend');
render(tripEventsList, createTripPoint(), 'beforeend');
