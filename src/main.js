import { render } from './framework/render.js';
import TripMainInfo from './view/trip-main-info-view.js';
import NewPointButton from './view/trip-main-new-point-button-view.js';
import TripListPresenter from './presenter/presenter-trip-list.js';
import TripPointsModel from './models/model-trip-point.js';
import FilterModel from './models/model-filter.js';
import FilterPresenter from './presenter/presenter-trip-filter.js';
import TripList from './view/trip-list-view.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION_TOKEN, END_POINT } from './const.js';
import OffersModel from './models/model-offers.js';
import DestinationModel from './models/model-destination.js';


const tripMain = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripMainInfo = new TripMainInfo();

/* Создаем экземпляр класса TripPointModel, который может вернуть с помощью метода getTripPoint()
массив моковых данных точек маршрута */
const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
});

const destinationsModel = new DestinationModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN)
});

const tripPointsModel = new TripPointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION_TOKEN),
  destinationsModel,
  offersModel
});


const filterPointsModel = new FilterModel();

const newPointButton = new NewPointButton({
  onClick: handleClickNewPointButton
});

const tripList = new TripList();


const tripListPresenter = new TripListPresenter({
  boardContainer: tripEvents,
  /* Помещаем экземпляр  tripPointsModel в конструктор презентера в виде
  второго свойства объекта, который передается на вход в конструктор*/
  tripPointsModel,
  offersModel,
  destinationsModel,
  filterPointsModel,
  tripList,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripMain,
  filterPointsModel,
  tripPointsModel
});


function handleNewPointFormClose() {
  newPointButton.element.disabled = false;
}

function handleClickNewPointButton() {
  tripListPresenter.createPoint();
  newPointButton.element.disabled = false;
}

tripPointsModel.init();
render(tripMainInfo, tripMain);
filterPresenter.init();
render(newPointButton, tripMain);
tripListPresenter.init();
