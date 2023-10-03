import dayjs from 'dayjs';
import { getRandomInt } from './utils/common';
import { generateId, getRandomArrayElement } from './utils/common';

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
    offers.set(item, [{title: 'upgrade', price: 50, isChecked: Boolean(getRandomInt(0, 1))}, {title: `${item}`, price: 250, isChecked: Boolean(getRandomInt(0, 1))}]);
  });

  return offers;

};

/* Объект-перечисление(начинается с большой буквы + CamelCase) содержит названия типов фильтрации по времени точек маршрута*/
const TimeFilter = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const NoPointTextType = {
  [TimeFilter.EVERYTHING] : 'Click New Event to create your first point',
  [TimeFilter.FUTURE]: 'There are no future events now',
  [TimeFilter.PAST]: 'There are no past events now',
  [TimeFilter.PRESENT]: 'There are no present events now'
};

const OFFERS = getOffers();
const DESCRIPTIONS = getDiscription();
const POINT_TYPE_ICON = getPointTypeIcon();

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    id: generateId(),
    name: 'Chamonix',
    description: DESCRIPTIONS.get('Chamonix'),
    photos: [
      {
        src: getRandomArrayElement(DESTINATIONS_PHOTOS),
        description: 'Any discription'
      },
      {
        src: getRandomArrayElement(DESTINATIONS_PHOTOS),
        description: 'Any discription'
      },
    ]
  },
  isFavorite: Boolean(getRandomInt(0, 1)),
  offers: OFFERS.get('Flight'),
  tripType: 'Flight',
};

const ONLY_NUMBERS_REGEXP = new RegExp(/^\d+$/);

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const END_POINT = 'https://21.objects.pages.academy/big-trip';

const AUTHORIZATION_TOKEN = 'Basic 44ReerT85FJgww';

export {AUTHORIZATION_TOKEN, END_POINT, DESCRIPTIONS, OFFERS, DESTINATIONS_PHOTOS, DESTINATIONS, POINT_TYPE_ICON, POINT_TYPE, TimeFilter, Mode, SortType, UpdateType, UserAction, NoPointTextType, BLANK_POINT, ONLY_NUMBERS_REGEXP, Method };
