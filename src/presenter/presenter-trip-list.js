import { render } from '../framework/render.js';
import NoPointView from '../view/trip-no-point-view.js';
import TripPointPresenter from './presenter-trip-point.js';


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
    const pointPresenter = new TripPointPresenter({
      tripList: this.#tripList
    });

    pointPresenter.init(tripPointData);
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

  init() {
    /* Создаем свойство, в котором будет храниться копия массива моковох данных точек маршрута*/
    this.#tripPoints = [...this.#tripPointsModel.getTripPoint()];

    this.#renderPointList();
  }
}
