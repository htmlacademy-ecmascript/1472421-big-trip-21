import { getRandomArrayElement, getRandomInt } from '../utils';
import { DESTINATIONS, DISCRIPTIONS, DESTINATIONS_PHOTOS, OFFERS, POINT_TYPE } from '../const';
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

/* Создаем массив с сгунерированными пунктами назначения */
const destinationsMock = new Array(5).fill().map(generateDestinations);

/* Генерируем объект точки маршута */
export function generateTripPoin() {

  const type = getRandomArrayElement(POINT_TYPE);

  return {
    id: generateId(),
    basePrice: getRandomInt(300, 800),
    dateFrom: dayjs().add(200, 'minutes').format('DD/MM/YY HH:MM'),
    dateTo: dayjs().add(260, 'minutes').format('DD/MM/YY HH:MM'),
    destination: getRandomArrayElement(destinationsMock).id,
    isFavorite: Boolean(getRandomInt(0, 1)),
    offers: OFFERS.get(type),
    type
  };
}


