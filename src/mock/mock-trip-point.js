import { getRandomArrayElement, getRandomInt, generateId } from '../utils/common';
import { DESTINATIONS, DISCRIPTIONS, DESTINATIONS_PHOTOS, OFFERS, POINT_TYPE, POINT_TYPE_ICON } from '../const';
import dayjs from 'dayjs';


/* Генерирует случайный пункт назначения */
function generateDestinations() {

  const name = getRandomArrayElement(DESTINATIONS);

  return {
    id: generateId(),
    name,
    discription: DISCRIPTIONS.get(name),
    pictures: [
      {
        src: getRandomArrayElement(DESTINATIONS_PHOTOS),
        discription: 'Any discription'
      }
    ]
  };
}

/* Создаем массив со сгенерированными пунктами назначения */
const destinationsMock = new Array(5).fill().map(generateDestinations);

/* Функция генерирует случайную дату, которая может быть прошедшей или будующей по отношению к текущей или текущей */
function generateDate() {
  return dayjs().add(getRandomInt(-30, 30), 'hours');
}

/* Генерируем объект точки маршута */
function generateTripPoint() {

  const tripType = getRandomArrayElement(POINT_TYPE);
  const generatedDate = generateDate();

  return {
    id: generateId(),
    basePrice: getRandomInt(300, 800),
    dateFrom: generatedDate,
    dateTo: dayjs(generatedDate).add(getRandomInt(2, 5), 'hours'),
    destination: getRandomArrayElement(destinationsMock),
    isFavorite: Boolean(getRandomInt(0, 1)),
    typeIcon: POINT_TYPE_ICON.get(tripType),
    offers: OFFERS.get(tripType),
    tripType,
  };
}

export {generateTripPoint};
