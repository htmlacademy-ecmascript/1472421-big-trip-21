import AbstractView from '../framework/view/abstract-view.js';
import { NoPointTextType } from '../const.js';


function createNoPointTemplate(timeTypeFilter) {
  return `
    <p class="trip-events__msg">${NoPointTextType[timeTypeFilter]}</p>
  `;
}

/* Компонент, отвечающий за раздел информации о путешествии в блоке trip-main */
export default class NoPointView extends AbstractView {

  #timeFilterType = null;

  constructor({timeFilterType}){
    super();
    this.#timeFilterType = timeFilterType;
  }

  get template() {
    return createNoPointTemplate(this.#timeFilterType);
  }
}
