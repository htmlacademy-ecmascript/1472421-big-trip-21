import {render} from './render.js';
import TripMainInfo from './view/trip-main-info.js';
import TripMainControl from './view/trip-main-control.js';
import NewPointButton from './view/trip-main-new-point-button.js';
import TripEventsPresenter from './presenter/trip-events-list-presenter.js';
import TripPointsModel from './models/models-trip-point.js';


const tripMain = document.querySelector('.trip-main');
const tripMainInfo = new TripMainInfo();
const tripMainControl = new TripMainControl();
const newPointButton = new NewPointButton();

const tripEvents = document.querySelector('.trip-events');
/* Создаем экземпляр класса TripPointModel, который может вернуть с помощью метода getTripPoint() массив моковых данных точек маршрута */
const tripPointsModel = new TripPointsModel();
/* Помещаем экземпляр  tripPointsModel в конструктор презентера в виде
  второго свойства объекта, который передается на вход в конструктор
*/
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer:tripEvents,
  tripPointsModel
});

render(tripMainInfo, tripMain);
render(tripMainControl, tripMain);
render(newPointButton, tripMain);

tripEventsPresenter.init();
