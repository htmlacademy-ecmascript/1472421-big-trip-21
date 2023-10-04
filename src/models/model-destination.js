export default class DestinationModel {

  #pointsApiService = null;
  #destinations = [];

  constructor({pointsApiService}){
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    this.#destinations = await this.#pointsApiService.getDestinations();
    return this.#destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
