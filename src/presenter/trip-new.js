import TripEditView from '../view/trip-edit.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../utils/const.js';
import {isEscEvent} from '../utils/common.js';

export default class TripNew {
  constructor(tripEventsContainer, changeData, dataModel) {
    this._tripEventsContainer = tripEventsContainer;
    this._changeData = changeData;
    this._dataModel = dataModel,

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
    this._tripEditComponent = new TripEditView(this._dataModel.getDestinations(), this._dataModel.getOffers());
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripEventsContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;
    this._btn.getElement().removeAttribute('disabled', 'disabled');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._tripEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._tripEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(trip) {
    this._changeData(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      trip,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
