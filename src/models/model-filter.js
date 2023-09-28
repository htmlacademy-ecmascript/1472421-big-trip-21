import Observable from '../framework/observable';
import { TimeFilter } from '../const';


export default class FilterModel extends Observable {

  #filter = TimeFilter.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
