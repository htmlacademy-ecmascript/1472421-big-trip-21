import { render } from '../render.js';
import TripSortForm from '../view/trip-sort-form.js';
import TripSortInputDay from '../view/trip-sort-input-day.js';
import TripSortInputEvent from '../view/trip-sort-input-event.js';
import TripSortInputTime from '../view/trip-sort-input-time.js';
import TripSortInputPrice from '../view/trip-sort-input-price.js';
import TripSortInputOffers from '../view/trip-sort-input-offers.js';
import TripEventsList from '../view/trip-events-list.js';
import TripEventsItem from '../view/trip-events-item.js';
import TripEventsEditPoint from '../view/trip-events-edit-point.js';
import TripEventsPoint from '../view/trip-events-point.js';



export default class TripEventsPresenter{
  tripSortForm = new TripSortForm();
  tripEventsList = new TripEventsList();
  tripEventsItemEdit = new TripEventsItem();
  tripEventsItemPoint = new TripEventsItem();

  constructor({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(this.tripSortForm, this.tripEventsContainer);
    render(new TripSortInputDay(), this.tripSortForm.getElement());
    render(new TripSortInputEvent(), this.tripSortForm.getElement());
    render(new TripSortInputTime(), this.tripSortForm.getElement());
    render(new TripSortInputPrice(), this.tripSortForm.getElement());
    render(new TripSortInputOffers(), this.tripSortForm.getElement());

    render(this.tripEventsList, this.tripEventsContainer);
    render(this.tripEventsItemEdit, this.tripEventsList.getElement());
    render(new TripEventsEditPoint(), this.tripEventsItemEdit.getElement());

    for(let i = 0; i < 3; i++){
      render(this.tripEventsItemPoint, this.tripEventsList.getElement());
      render(new TripEventsPoint(), this.tripEventsItemPoint.getElement())
    }
  }
}
