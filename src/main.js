import {render} from './render.js';
import TripMainInfo from './view/view-trip-main-info.js';
import TripMainControl from './view/view-trip-main-control.js';
import NewPointButton from './view/view-trip-main-new-point-button.js';
import TripListPresenter from './presenter/presenter-trip-list.js';
import TripPointsModel from './models/model-trip-point.js';


const tripMain = document.querySelector('.trip-main');
const tripMainInfo = new TripMainInfo();
const tripMainControl = new TripMainControl();
const newPointButton = new NewPointButton();

const tripEvents = document.querySelector('.trip-events');
/* Создаем экземпляр класса TripPointModel, который может вернуть с помощью метода getTripPoint()
массив моковых данных точек маршрута */
const tripPointsModel = new TripPointsModel();

const tripListPresenter = new TripListPresenter({
  tripEventsContainer:tripEvents,
  /* Помещаем экземпляр  tripPointsModel в конструктор презентера в виде
  второго свойства объекта, который передается на вход в конструктор
*/
  tripPointsModel,
});

render(tripMainInfo, tripMain);
render(tripMainControl, tripMain);
render(newPointButton, tripMain);

tripListPresenter.init();
