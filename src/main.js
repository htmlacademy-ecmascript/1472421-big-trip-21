import { render } from './framework/render.js';
import TripMainInfo from './view/trip-main-info-view.js';
import NewPointButton from './view/trip-main-new-point-button-view.js';
import TripListPresenter from './presenter/presenter-trip-list.js';
import TripPointsModel from './models/model-trip-point.js';
import FilterModel from './models/model-filter.js';
import FilterPresenter from './presenter/presenter-trip-filter.js';
import TripList from './view/trip-list-view.js';


const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripMainInfo = new TripMainInfo();

/* Создаем экземпляр класса TripPointModel, который может вернуть с помощью метода getTripPoint()
массив моковых данных точек маршрута */
const tripPointsModel = new TripPointsModel();

const filterPointsModel = new FilterModel();


const newPointButton = new NewPointButton();
const tripList = new TripList();


const tripListPresenter = new TripListPresenter({
  tripEventsContainer:tripEvents,
  /* Помещаем экземпляр  tripPointsModel в конструктор презентера в виде
  второго свойства объекта, который передается на вход в конструктор*/
  tripPointsModel,
  filterPointsModel,
  tripList,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripMain,
  filterPointsModel,
  tripPointsModel
});

render(tripMainInfo, tripMain);
filterPresenter.init();
render(newPointButton, tripMain);
tripListPresenter.init();
