import AbstractView from '../framework/view/abstract-view.js';


function createTripMainFilterItem(filterPointItem){

  const {timeFilterType, countFilterPoints} = filterPointItem;

  return `
    <div class="trip-filters__filter">
      <input id="filter-${timeFilterType}"
        class="trip-filters__filter-input
        visually-hidden" type="radio"
        name="trip-filter"
        value="${timeFilterType}"
        ${timeFilterType === 'everything' ? 'checked' : ''}
        ${countFilterPoints === 0 ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${timeFilterType}">${timeFilterType}</label>
    </div>
  `;
}

function createTripMainFilter(filterPointsItem) {

  const filterItemsTemlate = filterPointsItem.map(createTripMainFilterItem).join('');

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
export default class TripMainControl extends AbstractView {

  #filterPoints = [];

  constructor(filterPoints){
    super();
    this.#filterPoints = filterPoints;
  }

  get template() {
    return createTripMainFilter(this.#filterPoints);
  }
}
