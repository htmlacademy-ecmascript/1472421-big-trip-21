import { render, replace } from '../framework/render.js';
import TripEditPointView from '../view/trip-edit-point-view.js';
import NoPointView from '../view/trip-no-point-view.js';
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

    /* Функция, выполняющаяся после нажатия esc в форме редактирования */
    const escKeyDownHandler = (event) => {
      if(event.key === 'Escape'){
        event.preventDefault();
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    /* создаем экземпляр view точки маршрута, записывая туда объект с данными о точке маршрута из модели и функцию,
    описывающую действия по клику на элемент точки маршрута "стрелка вниз" */
    const tripPoint = new TripPointView({
      tripPoint: tripPointData,
      /* по клику на "стрелка вниз" вместо view точки маршрута, должна отрисоваться view редактирование точки маршрута*/
      onEditClick: () => {
        replacePointToEditPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripEditPoint = new TripEditPointView({
      editTripPoint: tripPointData,
      /* по клику на "стрелка вниз" вместо view точки маршрута, должна отрисоваться view редактирование точки маршрута*/
      onSubmitClick: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onArrowClick: () => {
        replaceEditPointToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
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
