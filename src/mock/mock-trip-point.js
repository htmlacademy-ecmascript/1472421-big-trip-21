import { getRandomArrayElement, getRandomInt, generateId } from '../utils/common';
import { DESTINATIONS, DESCRIPTIONS, DESTINATIONS_PHOTOS, POINT_TYPE, OFFERS} from '../const';
import { nanoid } from 'nanoid';


/* Генерирует случайный пункт назначения */
function generateDestinations() {

  const name = getRandomArrayElement(DESTINATIONS);

  return {
    id: generateId(),
    name,
    description: DESCRIPTIONS.get(name),
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
  };
}

/* Создаем массив со сгенерированными пунктами назначения */
const destinationsMock = new Array(5).fill().map(generateDestinations);

/* Функция генерирует случайную дату, которая может быть прошедшей или будующей по отношению к текущей или текущей */
function generateDate() {

  const dateFrom = new Date;
  dateFrom.setHours(getRandomInt(-30, 30));

  const dateTo = new Date(dateFrom);
  dateTo.setHours(dateFrom.getHours() + getRandomInt(2, 5));

  /* Возвращает две даты с разницей в значениях 2-5 часов */
  return {dateFrom, dateTo};

}

/* Генерируем объект точки маршута */
function generateTripPoint() {

  const tripType = getRandomArrayElement(POINT_TYPE);
  const {dateFrom, dateTo} = generateDate();

  return {
    id: nanoid(),
    basePrice: getRandomInt(300, 800),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: getRandomArrayElement(destinationsMock),
    isFavorite: Boolean(getRandomInt(0, 1)),
    offers: OFFERS.get(tripType),
    tripType,
  };
}

export {generateTripPoint};
