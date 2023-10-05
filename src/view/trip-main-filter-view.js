import AbstractView from '../framework/view/abstract-view.js';


function createTripMainFilterItem(filter, currentType){

  const {type: filterType, count: filterCount} = filter;

  return `
    <div class="trip-filters__filter">
      <input id="filter-${filterType}"
        class="trip-filters__filter-input
        visually-hidden" type="radio"
        name="trip-filter"
        value="${filterType}"
        ${filterType === currentType ? 'checked' : ''}
        ${filterCount === 0 ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
    </div>
  `;
}

function createTripMainFilter(filters, currentType) {

  const filterItemsTemlate = filters.map((filter) => createTripMainFilterItem(filter, currentType)).join('');

  return `
  <div class="trip-main__trip-controls  trip-controls">
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filterItemsTemlate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  </div>
`;
}

/* Компонент, отвечающий за раздел фильтров в блоке trip-main */
export default class TripMainFilter extends AbstractView {

  #filters = [];
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}){
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (event) => {
    event.preventDefault();
    this.#handleFilterTypeChange(event.target.value);
  };

  get template() {
    return createTripMainFilter(this.#filters, this.#currentFilter);
  }
}
