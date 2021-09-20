import TripPointView from '../view/trip-point.js';
import TripEditView from '../view/trip-edit.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { UserAction, UpdateType } from '../utils/const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class TripPoint {
  constructor(tripEventsListContainer, changeData, changeMode, dataModel) {
    this._tripEventsListContainer = tripEventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._dataModel = dataModel;

    this._tripPointComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleTripPointClick = this._handleTripPointClick.bind(this);
    this._handleTripEditClick = this._handleTripEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(dataModel, tripPoint) {
    this._tripPoint = tripPoint;
    this._dataModel = dataModel;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripEditComponent = this._tripEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripEditComponent = new TripEditView(this._dataModel.getDestinations(), this._dataModel.getOffers(), tripPoint);

    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripPointComponent.setTripPointClickHandler(this._handleTripPointClick);
    this._tripEditComponent.setTripPointClickHandler(this._handleTripEditClick);
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevTripPointComponent === null || prevTripEditComponent === null) {
      render(this._tripEventsListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointComponent, prevTripEditComponent);
      this._mode = Mode.DEFAULT;
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

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._tripPointComponent.shake(resetFormState);
        this._tripEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._tripEditComponent, this._tripPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    this._tripEditComponent.reset(this._tripPoint);
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

  _handleFavoriteClick(trip) {
    this._changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      Object.assign(
        {},
        trip,
        {
          isFavorite: !this._tripPoint.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(trip) {
    this._changeData(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      trip,
    );
  }

  _handleDeleteClick(trip) {
    this._changeData(
      UserAction.DELETE_TRIP,
      UpdateType.MINOR,
      trip,
    );
  }

  _handleTripPointClick() {
    this._replaceCardToForm();
  }

  _handleTripEditClick() {
    this._replaceFormToCard();
  }
}
