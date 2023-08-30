import { render } from '../framework/render.js';
import TripEditPointView from '../view/trip-edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';


export default class tripListPresenter{

  #tripEventsContainer = null;
  #tripPointsModel = null;
  #tripSortForm = null;
  #tripList = null;
  #tripListItemEdit = null;
  #tripListItemPoint = null;
  #tripPoints = [];

  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({tripEventsContainer, tripPointsModel, tripSortForm, tripList, tripListItemEdit, tripListItemPoint}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#tripSortForm = tripSortForm;
    this.#tripList = tripList;
    this.#tripListItemEdit = tripListItemEdit;
    this.#tripListItemPoint = tripListItemPoint;
  }

  init() {
    /* Создаем свойство, в котором будет храниться копия массива моковох данных точек маршрута*/
    this.#tripPoints = [...this.#tripPointsModel.getTripPoint()].slice(0,3);

    render(this.#tripSortForm, this.#tripEventsContainer);

    render(this.#tripList, this.#tripEventsContainer);
    render(this.#tripListItemEdit, this.#tripList.element);
    /* для того, что бы не было ошибок, нужно не только вернуть последний элемент массива
    объектов точек маршрута, но и заспредить его(извлечь из массива)*/
    render(new TripEditPointView(...this.#tripPointsModel.getTripPoint().slice(3)), this.#tripListItemEdit.element);

    for(let i = 0; i < 3; i++){
      /* Добавляем в список точек маршрута tripList элемент списка <li>*/
      render(this.#tripListItemPoint, this.#tripList.element);
      /* Добавляем в элемент списка <li> экземпляр класса точка маршрута(TripPointView)
        который в конструктор принимает элемент из массива моковых данных
      */
      render(new TripPointView({tripPoint: this.#tripPoints[i]}), this.#tripListItemPoint.element);
    }
  }
}
