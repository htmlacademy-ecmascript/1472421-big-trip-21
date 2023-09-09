import AbstractView from '../framework/view/abstract-view.js';


function createNoPointTemplate() {
  return `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
}

/* Компонент, отвечающий за раздел информации о путешествии в блоке trip-main */
export default class NoPointView extends AbstractView {

  constructor(){
    super();
  }

  get template() {
    return createNoPointTemplate();
  }
}
