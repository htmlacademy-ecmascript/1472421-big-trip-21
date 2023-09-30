import { nanoid } from 'nanoid';
import TripEditPointView from '../view/trip-edit-point-view';
import { UpdateType, UserAction } from '../const';
import {remove, render, RenderPosition} from '../framework/render.js';

export default class NewPointPresenter {

  #pointsContainer = null;
  #handleDataChange = null;
  #handleNewPointDestroy = null;
  #editPoint = null;

  constructor({pointsContainer, onDataChange, onNewPointDestroy}) {
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleNewPointDestroy = onNewPointDestroy;
  }

  init() {
    if (this.#editPoint !== null) {
      return;
    }

    this.#editPoint = new TripEditPointView({
      onSubmitClick: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onArrowClick: this.#handleDeleteClick
    });

    render(this.#editPoint, this.#pointsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editPoint === null) {
      return;
    }

    this.#handleNewPointDestroy();

    remove(this.#editPoint);
    this.#editPoint = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.destroy();
    }
  };
}
