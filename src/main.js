import { render } from './framework/render.js';
import TripMainInfo from './view/trip-main-info-view.js';
import TripMainControl from './view/trip-main-control-view.js';
import NewPointButton from './view/trip-main-new-point-button-view.js';
import TripListPresenter from './presenter/presenter-trip-list.js';
import TripPointsModel from './models/model-trip-point.js';
import TripSortForm from './view/trip-sort-form-view.js';
import TripList from './view/trip-list-view.js';
import TripListItem from './view/trip-item-view.js';


const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripMainInfo = new TripMainInfo();
const tripMainControl = new TripMainControl();
const newPointButton = new NewPointButton();

const tripSortForm = new TripSortForm();
const tripList = new TripList();
const tripListItemEdit = new TripListItem();
const tripListItemPoint = new TripListItem();


/* Создаем экземпляр класса TripPointModel, который может вернуть с помощью метода getTripPoint()
массив моковых данных точек маршрута */
const tripPointsModel = new TripPointsModel();

const tripListPresenter = new TripListPresenter({
  tripEventsContainer:tripEvents,
  /* Помещаем экземпляр  tripPointsModel в конструктор презентера в виде
  второго свойства объекта, который передается на вход в конструктор
*/
  tripPointsModel,
  tripSortForm,
  tripList,
  tripListItemEdit,
  tripListItemPoint
});

render(tripMainInfo, tripMain);
render(tripMainControl, tripMain);
render(newPointButton, tripMain);

tripListPresenter.init();
