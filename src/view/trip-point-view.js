import AbstractView from '../framework/view/abstract-view';

function createSelectedOffers(offers) {

  let offersList = '';

  offers.forEach((item) => {
    offersList += `
      <li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>
    `;
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
  const {offers, tripType, destination, typeIcon, dateFrom, dateTo, basePrice, isFavorite, } = tripPoint;

  const favoritePointClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const offersList = createSelectedOffers(offers);

  /* Вставляем переменные в соответствующие места в шаблоне */
  return `
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateFrom.format('MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${typeIcon}" alt="Event type icon">
      </div>
      <h3 class="event__title">${tripType} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${dateFrom.format('HH:MM')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${dateTo.format('HH:MM')}</time>
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
  `;
}

export default class TripPointView extends AbstractView {

  #tripPoint = null;
  /* Делаем возможным принимать на вход объект со свойством, хранящим в себе объект
    моковых данных
   */
  constructor ({tripPoint}){
    super();
    /* Записываем объект моковых данных точки маршрута в свойство  */
    this.#tripPoint = tripPoint;
  }

  get template() {
    /* Передаем в функцию создания шаблона объект моковых данных */
    return createTripPointView(this.#tripPoint);
  }
}
