import { remove, render } from '../framework/render.js';
import NoPointView from '../view/trip-no-point-view.js';
import TripPointPresenter from './presenter-trip-point.js';
import TripSortForm from '../view/trip-sort-form-view.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortTypePrice, sortTypeTime } from '../utils/point.js';


export default class tripListPresenter{

  #tripEventsContainer = null;
  #tripPointsModel = null;
  #tripSortForm = null;
  #tripList = null;
  #noPointView = null;

  #pointsPresenters = new Map;
  #currentSortType = SortType.DAY;


  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({tripEventsContainer, tripPointsModel, tripList }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#tripList = tripList;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
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

    this.#noPointView = new NoPointView();

    render(this.#noPointView, this.#tripList.element);
  }

  #renderTripSortForm() {

    this.#tripSortForm = new TripSortForm({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
      isPointListClear: this.tripPoints.length === 0 ? true : false
    });

    render(this.#tripSortForm, this.#tripEventsContainer);
  }

  #renderTripList(){
    render(this.#tripList, this.#tripEventsContainer);
  }

  /* При изменеинии, внесенном пользователем, в эту функцию попадут данные о типе изменения
  действии пользователя и данные состояния */
  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripPointsModel.addPoint(updateType, update)
        break;
      case UserAction.DELETE_POINT:
        this.#tripPointsModel.deletePoint(updateType, update)
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointBoard();
        this.#renderPointBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointBoard({resetSortType: true});
        this.#renderPointBoard();
        break;
    }
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
    this.#clearPointBoard();
    /* Отрисовываем список заново, при отрисовке данные будут браться из массива tripPoints который уже отсортирован при получении */
    this.#renderPointBoard();
  };

  /* Метод отрисовывает весь список точек с кнопками сортировки */
  #renderPointBoard() {

    this.#renderTripSortForm();

    this.#renderTripList();

    if(this.tripPoints.length === 0) {
      this.#renderNoPoint();
    }

    for(let i = 0; i < this.tripPoints.length; i++){
      this.#renderPoint(this.tripPoints[i]);
    }

  }

  /* Метод для очистки списка ТМ */
  #clearPointBoard(resetSortType = false) {

    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#tripSortForm);

    if(resetSortType){
      this.#currentSortType = SortType.DAY;
    }
  }

  init() {
    this.#renderPointBoard();
  }
}
