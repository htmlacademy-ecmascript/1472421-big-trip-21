import ApiService from './framework/api-service';
import { Method } from './const';

export default class PointsApiService extends ApiService {

  getDestinations() {
    /* Получаем пункты назанчения с сервера */
    return this._load({url: 'destinations'})
    /* затем парсим response */
      .then(ApiService.parseResponse);
  }

  getOffers(){
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  getPoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  /* Отправит на сервер запрос PUT, отправит обновление в ТМ */
  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  /* запрос - POST, добавление новой ТМ */
  async addPoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  /* запрос - DELETE, удаляет точку по id */
  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }
}
