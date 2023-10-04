import { POINT_TYPE, POINT_TYPE_ICON, BLANK_POINT, ONLY_NUMBERS_REGEXP } from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import { offersToMapOffers } from '../utils/point';

function createEventTypeItem(currentType) {
  return POINT_TYPE.map((typeItem) => `
    <div class="event__type-item">
      <input id="event-type-${typeItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem}" ${currentType === typeItem ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-1" data-type = ${typeItem}>${typeItem.charAt(0).toUpperCase() + typeItem.slice(1)}</label>
    </div>
  `).join('');
}

function createDestinationList(destinations) {
  return destinations.map((destinationItem) => `
    <option value="${destinationItem.name}"></option>
  `).join('');
}

function createOffersOptions(offers) {

  let offersOption = '';

  for(let i = 0; i < offers.length; i++){
    offersOption += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage"  ${offers[i].isChecked === true ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-1" data-type-offer = '${offers[i].title}'>
          ${offers[i].title} &plus;&euro;&nbsp; ${offers[i].price}
        </label>
      </div>
    `;
  }

  return offersOption;
}

function createDestinationPhotos(pictures){
  let picturesList = '';

  for(let i = 0; i < pictures.length; i++) {
    picturesList += `<img class="event__photo" src="${pictures[i].src}" alt="${pictures[i].description}">`;
  }

  return picturesList;
}

function createTripEditPointView(editTripPoint, offersData, destinationsData) {

  const {type, dateFrom, dateTo, basePrice, destination} = editTripPoint;

  const currentDestination = destinationsData.find((item) => item.id === destination);

  const currentOffers = offersData.get(type);

  const eventTypeItem = createEventTypeItem(type);

  const destinationList = createDestinationList(destinationsData);

  const offersOption = createOffersOptions(currentOffers);

  const destinationPhotos = createDestinationPhotos(currentDestination.pictures);


  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${POINT_TYPE_ICON.get(type)}" alt="Event type icon">
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
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.escape(currentDestination.name)}" list="destination-list-1">
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
            <p class="event__destination-description">${currentDestination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPhotos}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class TripEditPointView extends AbstractStatefulView {

  #handleSubmitClick = null;
  #handleArrowClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #offers = null;
  #destinations = null;

  constructor ({editTripPoint = BLANK_POINT, offers, destinations, onSubmitClick, onArrowClick, onDeleteClick}) {
    super();
    this._setState(TripEditPointView.parsePointToState(editTripPoint));
    this.#offers = offersToMapOffers(offers);
    this.#destinations = destinations;
    this.#handleSubmitClick = onSubmitClick;
    this.#handleArrowClick = onArrowClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }


  get template() {
    return createTripEditPointView(this._state, this.#offers, this.#destinations);
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
    this.element.querySelectorAll('.event__offer-selector').forEach((item) => {
      item.addEventListener('click', this.#offersClickHandler);
    });
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputHandler);

    this.#setDatepickers();
  }

  removeElement() {

    super.removeElement();

    if (this.#datepickerFrom || this.#datepickerTo) {
      this.#datepickerFrom.destroy();
      this.#datepickerTo.destroy();

      this.#datepickerFrom = null;
      this.#datepickerTo = null;
    }
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
      offers: this._state.offers //тут должен быть поиск из offers с
    });
  };

  #destinationInputHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      destination: {
        ...this._state.destination,
        name: event.target.value,
        description: event.target.value
      },
    });
  };

  #offersClickHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      /* обновляет поле offers объекта _state, помещая туда новый массив офферс, созданный на основе старого
      но с измененным полем isChecked у элемента массива, если поле title элемента массива соответствует дата аттрибуту type-offer элемента, на котором произошло
      событие 'click' */
      offers: [...this._state.offers].map((item) => {
        if(item.title === event.target.dataset.typeOffer){
          item.isChecked = !item.isChecked;
        }

        return item;
      })
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #deleteClickHandler = (event) => {
    event.preventDefault();
    this.#handleDeleteClick(this._state);
  };

  #priceInputHandler = (event) => {
    event.preventDefault();
    event.target.value = event.target.value.replace(/\D/g, '');
    if(event.target.value.match(ONLY_NUMBERS_REGEXP)){
      this.updateElement({
        basePrice: event.target.value,
      });
    }
  };

  #setDatepickers() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
        maxDate: this._state.dateTo,
        locale: {
          firstDayOfWeek: 1
        },
        'time_24hr': true
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.dateFrom,
        locale: {
          firstDayOfWeek: 1
        },
        'time_24hr': true
      }
    );
  }

  /* Делает копию данных о ТМ, что бы вернуть их в приватный метод _setState для установки _state */
  static parsePointToState(point) {
    return {
      ...point,
    };
  }

  /* Получает на вход свойство _state и копирует данные из него в данные ТМ */
  static parseStateToPoint(state){
    return {...state};
  }

  /* Метод, при вызове которого состояние элемента вернется в начальное состояние, в котором было равно данным ТМ до редактирования */
  reset(point) {
    /* Метод updateElement, записывает приняты на вход данные в _state и перерисовывает элемент */
    this.updateElement(TripEditPointView.parsePointToState(point));
  }
}
