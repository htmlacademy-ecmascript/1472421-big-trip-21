import { getRandomArrayElement, getRandomInt } from '../utils';
import { DESTINATIONS, DISCRIPTIONS, DESTINATIONS_PHOTOS, OFFERS, POINT_TYPE, POINT_TYPE_ICON } from '../const';
import dayjs from 'dayjs';

/* Генерирует случайный id от 0 до 2 */
function generateId() {
  return Math.floor(Math.random() * 3);
}

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

/* Создаем массив с сгенерированными пунктами назначения */
const destinationsMock = new Array(5).fill().map(generateDestinations);

/* Генерируем объект точки маршута */
function generateTripPoint() {

  const type = getRandomArrayElement(POINT_TYPE);

  return {
    id: generateId(),
    basePrice: getRandomInt(300, 800),
    dateFrom: dayjs().add(getRandomInt(20, 200), 'minutes'),
    dateTo: dayjs().add((getRandomInt(20, 200) + 60), 'minutes'),
    destination: getRandomArrayElement(destinationsMock),
    isFavorite: Boolean(getRandomInt(0, 1)),
    typeIcon: POINT_TYPE_ICON.get(type),
    offers: OFFERS.get(type),
    type,
  };
}

export {destinationsMock, generateTripPoint};