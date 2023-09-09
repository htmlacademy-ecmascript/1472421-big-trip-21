import { filter } from '../utils/filter';

/* генерирует массив объектов, в каждом объекте по два поля: тип временного фильтра (past, futer, present) и количество точек, соответствующих данному фильтру */
const generateMockFilter = (points) => Object.entries(filter).map(([timeFilterType, filterPoints]) => ({type: timeFilterType, count: filterPoints(points).length}));

export {generateMockFilter};
