export default class OffersModel {

  #pointsApiService = null;
  #offers = [];

  constructor({pointsApiService}){
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    this.#offers = await this.#pointsApiService.getOffers();
    return this.#offers;
  }

  get offers() {
    return this.#offers;
  }
}
