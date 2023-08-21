import { generateTripPoint } from '../mock/trip-point';

const POINT_COUNT = 3;

export default class TripPointsModel {

  /* Создает массив из четырех элементов.
     Каждый элемент является моковым объектом точки маршрута.
     {length:POINT_COUNT} - означает, что мы передаем в .from массиво поднобный объект
     масивоподобный потому, что мы прописываем ему свойство length(длинна)
  */
  tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint);

  getTripPoint(){
    return this.tripPoints;
  }
}
