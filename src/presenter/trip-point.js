import TripPointView from '../view/trip-point.js';
import TripEditView from '../view/trip-edit.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPoint {
  constructor(tripEventsListContainer, changeData, changeMode) {
    this._tripEventsListContainer = tripEventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripPointComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleTripPointClick = this._handleTripPointClick.bind(this);
    this._handleTripEditClick = this._handleTripEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripEditComponent = this._tripEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripEditComponent = new TripEditView(tripPoint);

    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripPointComponent.setTripPointClickHandler(this._handleTripPointClick);
    this._tripEditComponent.setTripPointClickHandler(this._handleTripEditClick);
    this._tripEditComponent.setFormSubmitHandler(this._handleTripEditClick);

    if (prevTripPointComponent === null || prevTripEditComponent === null) {
      render(this._tripEventsListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripEditComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._tripEditComponent, this._tripPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripPointComponent, this._tripEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._tripEditComponent.reset(this._tripPoint);
      this._replaceFormToCard();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._tripPoint,
        {
          isFavorite: !this._tripPoint.isFavorite,
        },
      ),
    );
  }

  _handleTripPointClick() {
    this._replaceCardToForm();
  }

  _handleTripEditClick() {
    this._replaceFormToCard();
  }
}
