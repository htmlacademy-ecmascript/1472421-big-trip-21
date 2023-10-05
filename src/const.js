import { nanoid } from 'nanoid';


const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['Chamonix', 'Amsterdam', 'Geneva', ];


/*Функция создает, заполняет экземляр класса Map (pointTypeIcon) данными,
  где ключ - тип точки маршрута
  значение - ссылка на иконку, соответствующую этому типу,
  и возвращает его */
const getPointTypeIcon = () => {
  const pointTypeIcon = new Map;

  POINT_TYPE.forEach((item) =>
    pointTypeIcon.set(item, `../img/icons/${item}.png`)
  );

  return pointTypeIcon;
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
  INIT: 'INIT'
};

const NoPointTextType = {
  [TimeFilter.EVERYTHING] : 'Click New Event to create your first point',
  [TimeFilter.FUTURE]: 'There are no future events now',
  [TimeFilter.PAST]: 'There are no past events now',
  [TimeFilter.PRESENT]: 'There are no present events now'
};


const POINT_TYPE_ICON = getPointTypeIcon();

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    id: nanoid(),
    name: 'Chamonix',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy.',
    pictures: [
      {
        src: '',
        description: ''
      },
      {
        src: '',
        description: ''
      },
    ]
  },
  isFavorite: false,
  offers: '',
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

export {AUTHORIZATION_TOKEN, END_POINT, DESTINATIONS, POINT_TYPE_ICON, POINT_TYPE, TimeFilter, Mode, SortType, UpdateType, UserAction, NoPointTextType, BLANK_POINT, ONLY_NUMBERS_REGEXP, Method };
