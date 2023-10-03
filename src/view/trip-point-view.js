import AbstractView from '../framework/view/abstract-view';
import { POINT_TYPE_ICON, OFFERS } from '../const';
import dayjs from 'dayjs';

function createSelectedOffers(offers) {

  let offersList = '';

  offers.forEach((item) => {
    if(item.isChecked){
      offersList += `
      <li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>
    `;
    }
  });

  return `
    <ul class="event__selected-offers">
      ${offersList}
    </ul>
  `;
}

function createTripPointView(tripPoint) {

  /* Деструктурируем объект, распределяя значение полей объекта
    по одноименным созданным переменным
  */
  const { tripType, destination, dateFrom, dateTo, basePrice, isFavorite, offers} = tripPoint;

  const favoritePointClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const offersList = createSelectedOffers(offers);

  /* Вставляем переменные в соответствующие места в шаблоне */
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${dayjs(dateFrom).format('MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${POINT_TYPE_ICON.get(tripType)}" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripType} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${dayjs(dateFrom).format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${dayjs(dateTo).format('HH:mm')}</time>
          </p>
          <p class="event__duration">01H 35M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
          ${offersList}
        <button class="event__favorite-btn  ${favoritePointClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

export default class TripPointView extends AbstractView {

  #tripPoint = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  /* Делаем возможным принимать на вход объект со свойством, хранящим в себе объект
    моковых данных
   */
  constructor ({tripPoint, onEditClick, onFavoriteClick}){
    super();
    /* Записываем объект моковых данных точки маршрута в свойство  */
    this.#tripPoint = tripPoint;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    /* По клику на кнопку favorite вызовится обработчик события */
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    /* Передаем в функцию создания шаблона объект моковых данных */
    return createTripPointView(this.#tripPoint);
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this.#handleFavoriteClick();
  };
}
