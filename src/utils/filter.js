import { TimeFilter } from '../const';
import { isPointExpired, isActual, isFuter } from './point';

const filter = {
  [TimeFilter.PAST]: (points) => points.filter((point) => isPointExpired(point.dateTo)),
  [TimeFilter.PRESENT]: (points) => points.filter((point) => isActual(point.dateFrom, point.dateTo)),
  [TimeFilter.FUTURE]: (points) => points.filter((point) => isFuter(point.dateFrom)),
};

export {filter};
