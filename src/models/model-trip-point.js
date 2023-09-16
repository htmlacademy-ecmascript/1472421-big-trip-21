import { generateTripPoint } from '../mock/mock-trip-point';
import { sortTypeDay } from '../utils/point';


const POINT_COUNT = 4;

export default class TripPointsModel {

  /* Создает массив из четырех элементов.
     Каждый элемент является моковым объектом точки маршрута.
     {length:POINT_COUNT} - означает, что мы передаем в .from массивоподнобный объект
     масивоподобный потому, что мы прописываем ему свойство length(длинна)
  */
  #tripPoints = Array.from({length: POINT_COUNT}, generateTripPoint).sort(sortTypeDay);

  getTripPoint(){
    return this.#tripPoints;
  }
}
