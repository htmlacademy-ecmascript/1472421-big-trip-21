import TripEditPointView from '../view/trip-edit-point-view';
import TripPointView from '../view/trip-point-view';
import { replace, render } from '../framework/render';

export default class TripPointPresenter {

  #tripList = null;
  #tripPointData = null;
  #point = null;
  #editPoint = null;

  constructor({tripList}) {
    this.#tripList = tripList;
  }

  init(tripPointData) {

    this.#tripPointData = tripPointData;

    /* создаем экземпляр view точки маршрута, записывая туда объект с данными о точке маршрута из модели и функцию,
    описывающую действия по клику на элемент точки маршрута "стрелка вниз" */
    this.#point = new TripPointView({
      tripPoint: this.#tripPointData,
      /* по клику на "стрелка вниз" вместо view точки маршрута, должна отрисоваться view редактирование точки маршрута*/
      onEditClick: this.#handleEditClick
    });

    this.#editPoint = new TripEditPointView({
      editTripPoint: this.#tripPointData,
      /* по клику на "стрелка вниз" вместо view точки маршрута, должна отрисоваться view редактирование точки маршрута*/
      onSubmitClick: this.#handleSubmitClick,
      onArrowClick: this.#handleSubmitClick
    });

    render(this.#point, this.#tripList.element);
  }

  #handleEditClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleSubmitClick = () => {
    this.#replaceEditPointToPoint();
  };

  #escKeyDownHandler = (event) => {
    if(event.key === 'Escape'){
      event.preventDefault();
      this.#replaceEditPointToPoint();
    }
  };

  #replacePointToEditPoint() {
    replace(this.#editPoint, this.#point);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditPointToPoint() {
    replace(this.#point, this.#editPoint);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

}
