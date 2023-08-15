import {render} from './render.js';
import TripMainInfo from './view/trip-main-info.js';
import TripMainControl from './view/trip-main-control.js';
import NewPointButton from './view/trip-main-new-point-button.js';
import TripEventsPresenter from './presenter/trip-events-list-presenter.js';

const tripMain = document.querySelector('.trip-main');
const tripMainInfo = new TripMainInfo();
const tripMainControl = new TripMainControl();
const newPointButton = new NewPointButton();

const tripEvents = document.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer:tripEvents});

render(tripMainInfo, tripMain);
render(tripMainControl, tripMain);
render(newPointButton, tripMain);

tripEventsPresenter.init();


