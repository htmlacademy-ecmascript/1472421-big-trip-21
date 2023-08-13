import { createElement } from '../render';

function createTripSortForm(){
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    </form>
  `;
}


/* Компонент, отвечающий за форму сортировки путешествий*/
export default class TripSortForm {
  getTemplate() {
    return createTripSortForm();
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
