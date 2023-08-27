import { createElement } from '../render';

function createTripEventsItem() {
  return `
    <li class="trip-events__item"></li>
  `;
}

export default class TripListItem {
  getTemplate() {
    return createTripEventsItem();
  }

  getElement() {
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
