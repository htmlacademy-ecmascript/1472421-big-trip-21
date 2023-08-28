import AbstractView from '../framework/view/abstract-view';

function createTripEventsItem() {
  return `
    <li class="trip-events__item"></li>
  `;
}

export default class TripListItem extends AbstractView {

  constructor(){
    super();
  }

  get template() {
    return createTripEventsItem();
  }
}
