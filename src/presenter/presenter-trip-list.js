import { render } from '../framework/render.js';
import NoPointView from '../view/trip-no-point-view.js';
import TripPointPresenter from './presenter-trip-point.js';
import TripSortForm from '../view/trip-sort-form-view.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortTypePrice } from '../utils/point.js';


export default class tripListPresenter{

  #tripEventsContainer = null;
  #tripPointsModel = null;
  #tripSortForm = null;
  #tripList = null;
  #tripPoints = [];
  #pointsPresenters = new Map;
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({tripEventsContainer, tripPointsModel, tripList }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#tripList = tripList;
  }

  #renderPoint(tripPointData) {
    const pointPresenter = new TripPointPresenter({
      tripList: this.#tripList,
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
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

    this.#tripSortForm = new TripSortForm({onSortTypeChange: this.#handleSortTypeChange})

    render(this.#tripSortForm, this.#tripEventsContainer);
  }

  #renderTripList(){
    render(this.#tripList, this.#tripEventsContainer);
  }

  /* Метод для обновления ТМ */
  #handleDataChange = (updatedPoint) => {
    /*функция при обновлении ТМ проверяет какая ТМ из массива ТМ обновилась, заменяется
    в массиве ТМ на обновленную и возвращает массив ТМ с обновленной ТМ */
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    /* В списке всех экземпляров презентера ТМ по id находим презентер с ТМ, которая обновилась
    запускаем у презентера метод init, передаем в метод обновленные данные ТМ*/
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  /* Метод, который при изменении режима ТМ на редактирование, закрывает все другие формы редактирования*/
  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortPoint(sortType) {

    switch(sortType){
      /* Если тип сортировки, соответствует сортировки по цене */
      case SortType.PRICE:
        /* выполнится сортировка массива данных в соответствии с колбекфункцией сортировки */
        this.#tripPoints.sort(sortTypePrice);
        break;
      /* case SortType.TIME:
        this.#tripPoints.sort(sortTypeTime)
        break; */
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }
    /* Сортируем массив данных в соответствии с заданным параметром сортировки */
    this.#sortPoint(sortType);
    /* Очищаем ранее отрисованный список ТМ */
    this.#clearPointlist();
    /* Отрисовываем список заново, при отрисовке данные будут браться из массива tripPoints который уже отсортирован методом sortType */
    this.#renderPointList();
  };

  /* Метод отрисовывает весь список точек с кнопками сортировки */
  #renderPointList() {

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

    /* Сделаем копию массива моковых данных еще раз, что бы можно было вернуться к начальному состоянию при сортировке */
    this.#sourcedTripPoints = [...this.#tripPointsModel.getTripPoint()];

    this.#renderTripSortForm();
    this.#renderPointList();
  }
}
