import { render } from '../framework/render.js';
import NoPointView from '../view/trip-no-point-view.js';
import TripPointPresenter from './presenter-trip-point.js';
import { updateItem } from '../utils/common.js';


export default class tripListPresenter{

  #tripEventsContainer = null;
  #tripPointsModel = null;
  #tripSortForm = null;
  #tripList = null;
  #tripPoints = [];
  #pointsPresenters = new Map;

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
    const pointPresenter = new TripPointPresenter({
      tripList: this.#tripList,
      onDataChange: this.#hendleDataChange
    });

    pointPresenter.init(tripPointData);
    /* При отрисовке каждой ТМ, экземпляр класса презентера ТМ сохраняется в массиве таких экземпляров
    по id, получаемому из объекта моковых данных */
    this.#pointsPresenters.set(tripPointData.id, pointPresenter);
  }

  #renderNoPoint() {
    render(new NoPointView(), this.#tripList.element);
  }

  #renderTripSortForm() {
    render(this.#tripSortForm, this.#tripEventsContainer);
  }

  #renderTripList(){
    render(this.#tripList, this.#tripEventsContainer);
  }

  /* Метод для обновления ТМ */
  #hendleDataChange = (updatedPoint) => {
    /*функция при обновлении ТМ проверяет какая ТМ из массива ТМ обновилась, заменяется
    в массиве ТМ на обновленную и возвращает массив ТМ с обновленной ТМ */
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    /* В списке всех экземпляров презентера ТМ по id находим презентер с ТМ, которая обновилась
    запускаем у презентера метод init, передаем в метод обновленные данные ТМ*/
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
  }
  /* Метод отрисовывает весь список точек с кнопками сортировки */
  #renderPointList() {

    this.#renderTripSortForm();

    this.#renderTripList();

    if(this.#tripPoints.length === 0) {
      this.#renderNoPoint();
    }

    for(let i = 0; i < 4; i++){
      this.#renderPoint(this.#tripPoints[i]);
    }

  }

  /* Метод для очистки списка ТМ */
  #clearPointlist() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  init() {
    /* Создаем свойство, в котором будет храниться копия массива моковох данных точек маршрута*/
    this.#tripPoints = [...this.#tripPointsModel.getTripPoint()];

    this.#renderPointList();
  }
}
