import { remove, render } from '../framework/render.js';
import NoPointView from '../view/trip-no-point-view.js';
import TripPointPresenter from './presenter-trip-point.js';
import TripSortForm from '../view/trip-sort-form-view.js';
import { SortType, UpdateType, UserAction, TimeFilter } from '../const.js';
import { sortTypeDay, sortTypePrice, sortTypeTime } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './presenter-new-trip-point.js';


export default class tripListPresenter{

  #boardContainer = null;
  #tripPointsModel = null;
  #tripSortForm = null;
  #tripList = null;
  #noPointView = null;
  #filterPointsModel = null;
  #newPointPresenter = null;

  #pointsPresenters = new Map;
  #currentSortType = SortType.DAY;
  #timeFilterType = TimeFilter.EVERYTHING;


  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({boardContainer, tripPointsModel, tripList, filterPointsModel, onNewPointDestroy }) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterPointsModel = filterPointsModel;
    this.#tripList = tripList;

    this.#newPointPresenter = new NewPointPresenter({
      pointsContainer: this.#tripList.element,
      onDataChange: this.#handleViewAction,
      onNewPointDestroy,
    });


    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    /* Добавляем подписчика на изменение на изменение модели */
    this.#filterPointsModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {

    this.#timeFilterType = this.#filterPointsModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    const filteredTripPoints = filter[this.#timeFilterType](tripPoints);

    switch(this.#currentSortType){
      /* Если тип сортировки, соответствует сортировки по цене */
      case SortType.PRICE:
        /* выполнится сортировка массива данных в соответствии с колбекфункцией сортировки */
        return filteredTripPoints.sort(sortTypePrice);
      case SortType.TIME:
        return filteredTripPoints.sort(sortTypeTime);
      default:
        return filteredTripPoints.sort(sortTypeDay);
    }
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterPointsModel.setFilter(UpdateType.MAJOR, TimeFilter.EVERYTHING);
    this.#newPointPresenter.init();
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

    this.#noPointView = new NoPointView({
      timeFilterType: this.#timeFilterType
    });

    render(this.#noPointView, this.#tripList.element);
  }

  #renderTripSortForm() {

    this.#tripSortForm = new TripSortForm({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
      isPointListClear: this.tripPoints.length === 0
    });

    render(this.#tripSortForm, this.#boardContainer);
  }

  #renderTripList(){
    render(this.#tripList, this.#boardContainer);
  }

  /* При изменеинии, внесенном пользователем, в эту функцию попадут данные о типе изменения
  действии пользователя и данные состояния */
  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripPointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tripPointsModel.deletePoint(updateType, update);
        break;
    }
  };

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
    this.#newPointPresenter.destroy();
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

    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#tripSortForm);

    if(this.#noPointView){
      remove(this.#noPointView);
    }

    if(resetSortType){
      this.#currentSortType = SortType.DAY;
    }
  }

  init() {
    this.#renderPointBoard();
  }
}
