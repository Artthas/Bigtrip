import TripEditView from '../view/trip-edit.js';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/const.js';
import { generateTrip } from '../mock/trip.js';

export default class TripNew {
  constructor(tripEventsContainer, changeData) {
    this._tripEventsContainer = tripEventsContainer;
    this._changeData = changeData;

    this._tripEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(btn) {
    if (this._tripEditComponent !== null) {
      return;
    }
    this._btn = btn;
    this._tripEditComponent = new TripEditView(generateTrip());
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripEventsContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }

    this._btn.removeAttribute('disabled', 'disabled');
    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(trip) {
    this._changeData(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, trip),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
