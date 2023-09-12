import dayjs from 'dayjs';

/*
  Под словом дата здесь и далее подразуменваятся полная дата (год, месяц, день, час, минута)
  Функция проверяющая прошла ли по времени точка маршрута, если дата окончания вплоть до минут еще не наступила, то вернет false(значит точка еще не прошла по времени)
  если дата окончания уже прошла, то вернет true (значит точка уже прошла по времени)
*/
function isPointExpired(dateTo){
  return dateTo && dayjs().isAfter(dateTo, 'milliseconds');
}

/* Функция, определяющая актуальна ли точка, если дата начала меньше или равна текущей дате и дата окончания больше или
  равна текущей дате- вернет true(то есть точка еще актуальна)
*/
function isPointActual(dateFrom, dateTo){
  return dateTo && (dayjs().isSame(dateFrom, 'minute') || dayjs().isAfter(dateFrom, 'minute')) && (dayjs().isSame(dateTo, 'minute') || dayjs().isBefore(dateTo, 'minute'));
}

/* Функция проверяет является ли дата начала точки позже текущей даты, если это так - вернет true */
function isPointFuter(dateFrom){
  return dateFrom && dayjs().isBefore(dateFrom, 'minute');
}

export {isPointExpired, isPointActual, isPointFuter};
