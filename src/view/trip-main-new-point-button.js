import {createElement} from '../render.js';



function createNewPointButton() {
  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>
  `;
}

/* Компонент, отвечающий за раздел информации о путешествии в блоке trip-main */
export default class NewPointButton {
  getTemplate() {
    return createNewPointButton();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
