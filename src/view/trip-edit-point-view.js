import { POINT_TYPE, DESTINATIONS } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createEventTypeItem(currentType) {
  return POINT_TYPE.map((typeItem) => `
    <div class="event__type-item">
      <input id="event-type-${typeItem.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem.toLowerCase()}" ${currentType === typeItem ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${typeItem.toLowerCase()}" for="event-type-${typeItem.toLowerCase()}-1">${typeItem}</label>
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

  const {tripType, destination, typeIcon, dateFrom, dateTo, basePrice, offers} = editTripPoints;

  const eventTypeItem = createEventTypeItem(tripType);

  const destinationList = createDestinationList();

  const offersOption = createOffersOptions(offers);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${typeIcon}" alt="Event type icon">
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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom.format('DD/MM/YY HH:MM')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo.format('DD/MM/YY HH:MM')}">
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

export default class TripEditPointView extends AbstractView {

  #editTripPoint = null;
  #handleSubmitClick = null;

  constructor ({editTripPoint, onSubmitClick}) {
    super();
    this.#editTripPoint = editTripPoint;
    this.#handleSubmitClick = onSubmitClick;

    this.element.querySelector('form')
      .addEventListener('submit', this.#submitClickHandler);
  }

  get template() {
    return createTripEditPointView(this.#editTripPoint);
  }

  #submitClickHandler = (event) => {
    event.preventDefault();
    this.#handleSubmitClick();
  };
}
