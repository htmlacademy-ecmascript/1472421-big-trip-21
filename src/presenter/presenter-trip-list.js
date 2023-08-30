import { render, replace } from '../framework/render.js';
import TripEditPointView from '../view/trip-edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';


export default class tripListPresenter{

  #tripEventsContainer = null;
  #tripPointsModel = null;
  #tripSortForm = null;
  #tripList = null;
  #tripPoints = [];

  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({tripEventsContainer, tripPointsModel, tripSortForm, tripList }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#tripSortForm = tripSortForm;
    this.#tripList = tripList;
  }

  #renderPoint(tripPointData) {
    /* создаем экземпляр view точки маршрута, записывая туда объект с данными о точке маршрута из модели и функцию,
    описывающую действия по клику на элемент точки маршрута "стрелка вниз" */
    const tripPoint = new TripPointView({
      tripPoint: tripPointData,
      /* по клику на "стрелка вниз" вместо view точки маршрута, должна отрисоваться view редактирование точки маршрута*/
      onEditClick: () => {
        replacePointToEditPoint();
      }
    });

    const tripEditPoint = new TripEditPointView({
      editTripPoint: tripPointData,
      /* по клику на "стрелка вниз" вместо view точки маршрута, должна отрисоваться view редактирование точки маршрута*/
      onSubmitClick: () => {
        replaceEditPointToPoint();
      }
    });

    /*функции заменяющие точку маршрута на редактирование точки маршрута и наоборот в DOM-дереве */
    function replacePointToEditPoint(){
      replace(tripEditPoint, tripPoint);
    }

    function replaceEditPointToPoint(){
      replace(tripPoint, tripEditPoint);
    }

    /* Добавляем в элемент списка <li> экземпляр класса точка маршрута(TripPointView)
      который в конструктор принимает элемент из массива моковых данных точек маршрута
    */
    render(tripPoint, this.#tripList.element);
  }

  init() {
    /* Создаем свойство, в котором будет храниться копия массива моковох данных точек маршрута*/
    this.#tripPoints = [...this.#tripPointsModel.getTripPoint()].slice(0,3);

    render(this.#tripSortForm, this.#tripEventsContainer);

    render(this.#tripList, this.#tripEventsContainer);
    /* для того, что бы не было ошибок, нужно не только вернуть последний элемент массива
    объектов точек маршрута, но и заспредить его(извлечь из массива)*/
    /* render(new TripEditPointView(...this.#tripPointsModel.getTripPoint().slice(3)), this.#tripListItemEdit.element); */

    for(let i = 0; i < 3; i++){
      this.#renderPoint(this.#tripPoints[i]);
    }
  }
}
