const POINT_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATIONS = ['Chamonix', 'Amsterdam', 'Geneva'];
const DESTINATIONS_PHOTOS = ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg'];

/*Функция создает, заполняет экземляр класса Map (pointTypeIcon) данными,
  где ключ - тип точки маршрута
  значение - ссылка на иконку, соответствующую этому типу,
  и возвращает его */
const getPointTypeIcon = () => {
  const pointTypeIcon = new Map;

  POINT_TYPE.forEach((item) =>
    pointTypeIcon.set(item, `../img/icons/${item.toLowerCase()}.png`)
  );

  return pointTypeIcon;
};

const getDiscription = () => {
  const description = new Map;

  description.set('Chamonix', 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy.');
  description.set('Amsterdam', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, quaerat!');
  description.set('Geneva', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quae explicabo quia voluptatem eius!');

  return description;
};

const getOffers = () => {
  const offers = new Map;

  POINT_TYPE.forEach((item) => {
    offers.set(item, [{title: 'upgrade', price: 50}, {title: `${item}`, price: 250}]);
  });

  return offers;

};

/* Объект-перечисление(начинается с большой буквы + CamelCase) содержит названия типов фильтрации по времени точек маршрута*/
const TimeFilter = {
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
  EVERYTHING: 'everything',
};

/* Перечисление режимов отображения ТМ */
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

/* Перечисление типов сортировки */
const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time'
};

const OFFERS = getOffers();
const DISCRIPTIONS = getDiscription();
const POINT_TYPE_ICON = getPointTypeIcon();

export {DISCRIPTIONS, OFFERS, DESTINATIONS_PHOTOS, DESTINATIONS, POINT_TYPE_ICON, POINT_TYPE, TimeFilter, Mode, SortType};
