import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

function createTripSortForm(){
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
        <label class="trip-sort__btn" for="sort-day" data-sort-type = '${SortType.DAY}'>Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time" data-sort-type = '${SortType.TIME}'>Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price" data-sort-type = '${SortType.PRICE}'>Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>
  `;
}


/* Компонент, отвечающий за форму сортировки путешествий*/
export default class TripSortForm extends AbstractView {

  #handleSortTypeChange = null;

  constructor({onSortTypeChange}){
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeClickHandler);
  }

  /* Функция, вызываемая при клике на форму сортировки */
  #sortTypeClickHandler = (event) => {
    /* если клик был не по элементу <label> то функция завершит работу */
    if(event.target.tagName !== 'LABEL') {
      return;
    }

    event.preventDefault();
    /* data атрибут будет получен через обращение dataset.sortType (название дата атр. camelCase хотя в шаблоне data-sort-type) */
    this.#handleSortTypeChange(event.target.dataset.sortType);
  };

  get template() {
    return createTripSortForm();
  }
}
