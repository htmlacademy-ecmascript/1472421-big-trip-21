import AbstractView from '../framework/view/abstract-view.js';


function createNewPointButton() {
  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>
  `;
}

/* Компонент, отвечающий за раздел информации о путешествии в блоке trip-main */
export default class NewPointButton extends AbstractView {

  constructor(){
    super();
  }

  get template() {
    return createNewPointButton();
  }
}
