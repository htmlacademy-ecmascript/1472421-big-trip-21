import {render} from './render.js';
import TripMainInfo from './view/view-trip-main-info.js';
import TripMainControl from './view/view-trip-main-control.js';
import NewPointButton from './view/view-trip-main-new-point-button.js';
import TripEventsPresenter from './presenter/presenter-trip-list.js';
import TripPointsModel from './models/model-trip-point.js';
import EditTripPointModel from './models/model-edit-trip-point.js';

const tripMain = document.querySelector('.trip-main');
const tripMainInfo = new TripMainInfo();
const tripMainControl = new TripMainControl();
const newPointButton = new NewPointButton();

const tripEvents = document.querySelector('.trip-events');
/* Создаем экземпляр класса TripPointModel, который может вернуть с помощью метода getTripPoint()
массив моковых данных точек маршрута */
const tripPointsModel = new TripPointsModel();

const editTripPointModel = new EditTripPointModel();

const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer:tripEvents,
  /* Помещаем экземпляр  tripPointsModel в конструктор презентера в виде
  второго свойства объекта, который передается на вход в конструктор
*/
  tripPointsModel,
  editTripPointModel
});

render(tripMainInfo, tripMain);
render(tripMainControl, tripMain);
render(newPointButton, tripMain);

tripEventsPresenter.init();
