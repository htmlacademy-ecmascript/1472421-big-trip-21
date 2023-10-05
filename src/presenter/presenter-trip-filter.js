import {render, replace, remove} from '../framework/render.js';
import TripMainFilter from '../view/trip-main-filter-view.js';
import { filter } from '../utils/filter.js';
import { TimeFilter, UpdateType } from '../const.js';


export default class FilterPresenter {
  #filterContainer = null;
  #filterPointsModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterPointsModel, tripPointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterPointsModel = filterPointsModel;
    this.#pointsModel = tripPointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterPointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.tripPoints;

    return Object.values(TimeFilter).map((type) => ({
      type,
      count: filter[type](points).length
    }));
  }

  init() {
    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripMainFilter({
      filters,
      currentFilterType: this.#filterPointsModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterPointsModel.tripPoints === filterType) {
      return;
    }

    this.#filterPointsModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
