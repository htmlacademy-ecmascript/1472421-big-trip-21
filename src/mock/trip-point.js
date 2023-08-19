import { getRandomArrayElement } from '../utils';
import { DESTINATIONS } from '../const';
import { DISCRIPTIONS } from '../const';
import { DESTINATIONS_PHOTOS } from '../const';

/*
  Создаем моковые данные для заполнения шаблона отрисовки точки маршрута
  данные в пункт destinations попадают из отдельной структуры данных
  */
/* const mockPoints = [
  {
    id: '1',
    datetime : '2019-03-18',
    type: 'Drive',
    typeIcon: 'img/icons/drive.png',
    destinations: '',
    isFavorite: false,
    offers : [],
  }
]
 */

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


