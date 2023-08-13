import { createElement } from "../render";

function createTripEventsList() {
  return `
    <ul class="trip-events__list"></ul>
  `
}

export default class TripEventsList {
  getTemplate() {
    return createTripEventsList();
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
