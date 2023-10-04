import dayjs from 'dayjs';

/*
  Под словом дата здесь и далее подразуменваятся полная дата (год, месяц, день, час, минута)
  Функция проверяющая прошла ли по времени точка маршрута, если дата окончания вплоть до минут еще не наступила, то вернет false(значит точка еще не прошла по времени)
  если дата окончания уже прошла, то вернет true (значит точка уже прошла по времени)
*/
function isPointExpired(dateTo){
  return dayjs(dateTo) && dayjs().isAfter(dayjs(dateTo), 'milliseconds');
}

/* Функция, определяющая актуальна ли точка, если дата начала меньше или равна текущей дате и дата окончания больше или
  равна текущей дате- вернет true(то есть точка еще актуальна)
*/
function isPointActual(dateFrom, dateTo){
  return dateTo && (dayjs().isSame(dayjs(dateFrom), 'minute') || dayjs().isAfter(dayjs(dateFrom), 'minute')) && (dayjs().isSame(dayjs(dateTo), 'minute') || dayjs().isBefore(dayjs(dateTo), 'minute'));
}

/* Функция проверяет является ли дата начала точки позже текущей даты, если это так - вернет true */
function isPointFuter(dateFrom){
  return dayjs(dateFrom) && dayjs().isBefore(dayjs(dateFrom), 'minute');
}

/* Определение результата ф-ции compare при значение null одного из сравниваемых элементов */
function getWeightForNullValue(valueA, valueB){
  if(valueA === null && valueB === null) {
    return 0;
  }

  if(valueA === null) {
    return 1;
  }

  if(valueB === null){
    return -1;
  }

  return null;
}

/* функция сортировки по стоимости от максимальной к минимальной */
function sortTypePrice(pointA, pointB) {
  const weight = getWeightForNullValue(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

function sortTypeDay(pointA, pointB) {
  const weight = getWeightForNullValue(pointA.dateFrom, pointB.dateTo);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateTo));
}

function sortTypeTime(pointA, pointB) {
  const weight = getWeightForNullValue(pointA.dateFrom, pointB.dateTo);
  const durationA = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const durationB = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));

  return weight ?? durationA - durationB;
}

function isDateChange(point, updatePoint) {
  return dayjs(point.dateFrom).isSame(dayjs(updatePoint.dateFrom)) && dayjs(point.dateTo).isSame(dayjs(updatePoint.dateTo));
}

function offersToMapOffers(offers) {
  const mapOffers = new Map();

  offers.forEach((offer) => {
    mapOffers.set(offer.type, offer.offers);
  });

  return mapOffers;
}

export {isPointExpired, isPointActual, isPointFuter, sortTypePrice, sortTypeDay, sortTypeTime, isDateChange, offersToMapOffers};
