import { render } from '../framework/render.js';
import NoPointView from '../view/trip-no-point-view.js';
import TripPointPresenter from './presenter-trip-point.js';
import TripSortForm from '../view/trip-sort-form-view.js';
import { SortType, UpdateType } from '../const.js';
import { sortTypePrice, sortTypeTime } from '../utils/point.js';


export default class tripListPresenter{

  #tripEventsContainer = null;
  #tripPointsModel = null;
  #tripSortForm = null;
  #tripList = null;

  #pointsPresenters = new Map;
  #currentSortType = SortType.DAY;


  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({tripEventsContainer, tripPointsModel, tripList }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#tripList = tripList;
  }

  get tripPoints() {
    switch(this.#currentSortType){
      /* Если тип сортировки, соответствует сортировки по цене */
      case SortType.PRICE:
        /* выполнится сортировка массива данных в соответствии с колбекфункцией сортировки */
        return [...this.#tripPointsModel.tripPoints].sort(sortTypePrice);
      case SortType.TIME:
        return [...this.#tripPointsModel.tripPoints].sort(sortTypeTime);
      default:
        return this.#tripPointsModel.tripPoints;
    }
  }

  #renderPoint(tripPointData) {
    const pointPresenter = new TripPointPresenter({
      tripList: this.#tripList,
      onDataChange: this.#handleViewAction,
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

    this.#tripSortForm = new TripSortForm({onSortTypeChange: this.#handleSortTypeChange});

    render(this.#tripSortForm, this.#tripEventsContainer);
  }

  #renderTripList(){
    render(this.#tripList, this.#tripEventsContainer);
  }

  #handleViewAction = (actionType, updateType, update) => {

  }

  #handleModelEvent = (updateType, data) => {

  };

  /* Метод, который при изменении режима ТМ на редактирование, закрывает все другие формы редактирования*/
  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }
    /* Меняем текущий тип сортировки*/
    this.#currentSortType = sortType;
    /* Очищаем ранее отрисованный список ТМ */
    this.#clearPointlist();
    /* Отрисовываем список заново, при отрисовке данные будут браться из массива tripPoints который уже отсортирован при получении */
    this.#renderPointList();
  };

  /* Метод отрисовывает весь список точек с кнопками сортировки */
  #renderPointList() {

    this.#renderTripList();

    if(this.tripPoints.length === 0) {
      this.#renderNoPoint();
    }

    for(let i = 0; i < 4; i++){
      this.#renderPoint(this.tripPoints[i]);
    }

  }

  /* Метод для очистки списка ТМ */
  #clearPointlist() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  init() {
    this.#renderTripSortForm();
    this.#renderPointList();
  }
}
