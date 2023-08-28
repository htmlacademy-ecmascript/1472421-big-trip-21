import AbstractView from '../framework/view/abstract-view';

function createTripEventsList() {
  return `
    <ul class="trip-events__list"></ul>
  `;
}

export default class TripList extends AbstractView {

  constructor(){
    super();
  }


  get template() {
    return createTripEventsList();
  }
}
