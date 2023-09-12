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

    /* Переменные, содержащие в себе свойства #point и #editPoint до переопределения, для проведения проверки
    при переотрисовке точки маршрута */
    const prevPoint = this.#point;
    const prevEditPoint = this.#editPoint;

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

    /* При отрисовке(вызове метода init) данный блок проверит, были ли раньше отрисованы ТМ или РТМ,
    если нет - отрисует ТМ в списке точек маршрута и закончит выполнение метода командой return */
    if(prevPoint === null || prevEditPoint === null){
      render(this.#point, this.#tripList.element);
      return;
    }

    /*Данные блоки при не первом вызове init() проверят содержатся ли в списке точек точки, созданные придыдущим вызовом метода init()
    и если в списке они есть, вызовится фун-я replace, заменяющая старую ТМ(РТМ) на новую, созданную текущим вызовом метода init() */
    if(this.#tripList.contains(prevPoint.element)){
      replace(this.#point, prevPoint);
    }

    if(this.#tripList.contains(prevEditPoint.element)){
      replace(this.#editPoint, prevEditPoint);
    }
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
