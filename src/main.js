import { render } from './framework/render.js';
import TripMainInfo from './view/trip-main-info-view.js';
import TripMainFilter from './view/trip-main-filter-view.js';
import NewPointButton from './view/trip-main-new-point-button-view.js';
import TripListPresenter from './presenter/presenter-trip-list.js';
import TripPointsModel from './models/model-trip-point.js';
import TripSortForm from './view/trip-sort-form-view.js';
import TripList from './view/trip-list-view.js';
import { generateMockFilter } from './mock/mock-filter.js';


const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripMainInfo = new TripMainInfo();

/* Создаем экземпляр класса TripPointModel, который может вернуть с помощью метода getTripPoint()
массив моковых данных точек маршрута */
const tripPointsModel = new TripPointsModel();

/* заполняем view фильтра данными о количестве точек, попадающих под каждый тип фильтра и типом фильтра */
const filterPoints = generateMockFilter(tripPointsModel.getTripPoint());
const tripMainFilter = new TripMainFilter(filterPoints);


const newPointButton = new NewPointButton();
const tripSortForm = new TripSortForm();
const tripList = new TripList();


const tripListPresenter = new TripListPresenter({
  tripEventsContainer:tripEvents,
  /* Помещаем экземпляр  tripPointsModel в конструктор презентера в виде
  второго свойства объекта, который передается на вход в конструктор
*/
  tripPointsModel,
  tripSortForm,
  tripList,
});

render(tripMainInfo, tripMain);
render(tripMainFilter, tripMain);
render(newPointButton, tripMain);

tripListPresenter.init();
