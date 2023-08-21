export const POINT_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const POINT_TYPE_ICON = new Map;

/* Заполняем экземляр класса Map (POINT_TYPE_ICON) данными,
  где ключ - тип точки маршрута
  значение - ссылка на иконку, соответствующую этому типу
*/
POINT_TYPE.forEach((item) =>
  POINT_TYPE_ICON.set(item, `../img/icons/${item.toLowerCase()}.png`)
);

export const DESTINATIONS = ['Chamonix', 'Amsterdam', 'Geneva'];

const DISCRIPTIONS = new Map;

DISCRIPTIONS.set('Chamonix', 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy.');
DISCRIPTIONS.set('Amsterdam', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, quaerat!');
DISCRIPTIONS.set('Geneva', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quae explicabo quia voluptatem eius!');

export const DESTINATIONS_PHOTOS = ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg'];

const OFFERS = new Map;


for(let i = 0; i < POINT_TYPE.length - 1; i++){
  OFFERS.set(POINT_TYPE[i], [{title: 'upgrade', price: 50}, {title: 'upgrade', price: 250}]);
}

export {DISCRIPTIONS, OFFERS};
