import { TimeFilter } from '../const';
import { isPointExpired, isPointActual, isPointFuter } from './point';

/**
  * Объект, ключами которого являются названия возможных состояний ТМ относительно текущего времени,
  * а значениями стрелочные функции, возвращающие отфильтрованный массив ТМ в зависимости от выбранного параметра фильтрации.
  * @type {object}
*/
const filter = {
  [TimeFilter.EVERYTHING]: (points) => points,
  [TimeFilter.FUTURE]: (points) => points.filter((point) => isPointFuter(point.dateFrom)),
  [TimeFilter.PRESENT]: (points) => points.filter((point) => isPointActual(point.dateFrom, point.dateTo)),
  [TimeFilter.PAST]: (points) => points.filter((point) => isPointExpired(point.dateTo)),
};

export {filter};
