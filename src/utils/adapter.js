import { getById } from './common';

function adaptedPointToClients(points, offers, destinations) {

  const adaptedPoints = [];

  points.forEach((point) => {
    /* Приводим необходимые поля в caelCase */
    let adaptedPoint = {
      ...point,
      basePrice: point['base_price'] === null ? 0 : point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
      offers: offers.get(point.type),
      destination: getById(destinations, point.destination)
    };

    /* записывает offers и destination в соответствующие поля(offers получаем по типу, destinations по id) */
    /* adaptedPoint = {
      ...adaptedPoint,
      offers: offers.get(adaptedPoint.type),
      destination: getById(destinations, adaptedPoint.destination)
    }; */

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    adaptedPoints.push(adaptedPoint);
  });

  return adaptedPoints;
}

export {adaptedPointToClients};
