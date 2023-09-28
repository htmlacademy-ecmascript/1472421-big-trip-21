import TripEditPointView from '../view/trip-edit-point-view';
import TripPointView from '../view/trip-point-view';
import { replace, render, remove } from '../framework/render';
import { Mode } from '../const';
import { UserAction, UpdateType } from '../const';

export default class TripPointPresenter {

  #tripList = null;
  #tripPointData = null;
  #point = null;
  #editPoint = null;
  #handleDataChange = null;
  #mode = Mode.DEFAULT;
  #handleModeChange = null;

  constructor({tripList, onDataChange, onModeChange}) {
    this.#tripList = tripList;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPoint = new TripEditPointView({
      editTripPoint: this.#tripPointData,
      /* по клику на "стрелка вниз" вместо view точки маршрута, должна отрисоваться view редактирование точки маршрута*/
      onSubmitClick: this.#handleSubmitClick,
      onArrowClick: this.#handleArrowClick,
      onDeleteClick: this.#handleDeleteClick
    });

    /* При отрисовке(вызове метода init) данный блок проверит, были ли раньше отрисованы ТМ или РТМ,
    если нет - отрисует ТМ в списке точек маршрута и закончит выполнение метода командой return */
    if(prevPoint === null || prevEditPoint === null){
      render(this.#point, this.#tripList.element);
      return;
    }

    /*Данные блоки при не первом вызове init() проверят содержатся ли в списке точек точки, созданные придыдущим вызовом метода init()
    и если в списке они есть, вызовится фун-я replace, заменяющая старую ТМ(РТМ) на новую, созданную текущим вызовом метода init() */
    if(this.#mode === Mode.DEFAULT){
      replace(this.#point, prevPoint);
    }

    if(this.#mode === Mode.EDITING){
      replace(this.#editPoint, prevEditPoint);
    }

    remove(prevPoint);
    remove(prevEditPoint);
  }

  destroy() {
    remove(this.#point);
    remove(this.#editPoint);
  }

  #handleEditClick = () => {
    this.#replacePointToEditPoint();
  };

  #handleArrowClick = () => {
    this.#editPoint.reset(this.#tripPointData);
    this.#replaceEditPointToPoint();
  };

  #handleSubmitClick = (tripPointData) => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, tripPointData);
    this.#replaceEditPointToPoint();
  };

  /* метод, срабатывающий при клике на звездочку и вызывающий метод, обрабатывающий изменения,
  которой на вход примет объект, на котором сработал клик и заменить там значение поля issFavorite */
  #handleFavoriteClick = () => {
    /* оператор (...) нужен потому, что tripPointData по сути массив из одного элемента
     */
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#tripPointData, isFavorite: !this.#tripPointData.isFavorite}
    );
  };

  #handleDeleteClick = (tripPointData) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      tripPointData
    );
  };

  #escKeyDownHandler = (event) => {
    if(event.key === 'Escape'){
      event.preventDefault();
      this.#editPoint.reset(this.#tripPointData);
      this.#replaceEditPointToPoint();
    }
  };

  #replacePointToEditPoint() {
    replace(this.#editPoint, this.#point);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    /* При замене ТМ на РТМ будет вызвана функция, которая у всех презентеров с mode: editting вызовет resetView()
     */
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditPointToPoint() {
    replace(this.#point, this.#editPoint);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  /* Метод, меняющий РТМ на ТМ, если режим ТМ не по умолчанию, то есть если она открыта для редактирования */
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPoint.reset(this.#tripPointData);
      this.#replaceEditPointToPoint();
    }
  }

}
