import { POINT_TYPE, DESTINATIONS, DISCRIPTIONS } from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { POINT_TYPE_ICON } from '../const';
import dayjs from 'dayjs';

function createEventTypeItem(currentType) {
  return POINT_TYPE.map((typeItem) => `
    <div class="event__type-item">
      <input id="event-type-${typeItem.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem.toLowerCase()}" ${currentType === typeItem ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${typeItem.toLowerCase()}" for="event-type-${typeItem.toLowerCase()}-1" data-type = ${typeItem}>${typeItem}</label>
    </div>
  `).join('');
}

function createDestinationList() {
  return DESTINATIONS.map((destinationItem) => `
    <option value="${destinationItem}"></option>
  `).join('');
}

function createOffersOptions(offers) {

  let offersOption = '';

  for(let i = 0; i < offers.length; i++){
    offersOption += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${i === 0 ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offers[i].title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offers[i].price}</span>
        </label>
      </div>
    `;
  }

  return offersOption;
}

function createTripEditPointView(editTripPoints) {

  const {tripType, dateFrom, dateTo, basePrice, offers, destination, } = editTripPoints;

  const eventTypeItem = createEventTypeItem(tripType);

  const destinationList = createDestinationList();

  const offersOption = createOffersOptions(offers);

  console.dir(dateFrom)

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${POINT_TYPE_ICON.get(tripType)}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeItem}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${tripType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersOption}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.discription}</p>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class TripEditPointView extends AbstractStatefulView {

  #handleSubmitClick = null;
  #handleArrowClick = null;

  constructor ({editTripPoint, onSubmitClick, onArrowClick}) {
    super();
    this._setState(TripEditPointView.parsePointToState(editTripPoint));
    this.#handleSubmitClick = onSubmitClick;
    this.#handleArrowClick = onArrowClick;

    this._restoreHandlers();
  }

  get template() {
    return createTripEditPointView(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#arrowClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#typeIconClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);
  }

  #submitClickHandler = (event) => {
    event.preventDefault();
    this.#handleSubmitClick(TripEditPointView.parseStateToPoint(this._state));
  };

  #arrowClickHandler = (event) => {
    event.preventDefault();
    this.#handleArrowClick();
  };

  #typeIconClickHandler = (event) => {
    /* Если клик межну двумя типами списков маршрута - ничего не делать*/
    if(!event.target.classList.contains('event__type-label')){
      return;
    }

    event.preventDefault();
    this.updateElement({
      tripType: event.target.dataset.type,
    });
  };

  #destinationInputHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      destination: {
        ...this._state.destination,
        name: event.target.value,
        discription: DISCRIPTIONS.get(event.target.value)
      },
    });
  };

  /* Делает копию данных о ТМ, что бы вернуть их в приватный метод _setState для установки _state */
  static parsePointToState(point) {
    return {
      ...point,
      destination:{
        ...point.destination,
        name: point.destination['name'],
      }
    };
  }

  /* Получает на вход свойство _state и копирует данные из него в данные ТМ */
  static parseStateToPoint(state){
    const point = {...state};

    return point;
  }
}
