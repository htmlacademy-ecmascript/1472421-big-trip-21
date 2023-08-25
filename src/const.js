const POINT_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATIONS = ['Chamonix', 'Amsterdam', 'Geneva'];
const DESTINATIONS_PHOTOS = ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg'];

/*Функция создает, заполняет экземляр класса Map (pointTypeIcon) данными,
  где ключ - тип точки маршрута
  значение - ссылка на иконку, соответствующую этому типу,
  и возвращает его */
const getpointTypeIcon = () => {
  const pointTypeIcon = new Map;

  POINT_TYPE.forEach((item) =>
    pointTypeIcon.set(item, `../img/icons/${item.toLowerCase()}.png`)
  );

  return pointTypeIcon;
}

const getDiscription = () => {
  const discription = new Map;

  discription.set('Chamonix', 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy.');
  discription.set('Amsterdam', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, quaerat!');
  discription.set('Geneva', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quae explicabo quia voluptatem eius!');

  return discription;
}

const getOffers = () => {
  const offers = new Map;

  POINT_TYPE.forEach((item) => {
    offers.set(item, [{title: 'upgrade', price: 50}, {title: 'upgrade', price: 250}]);
  });

  return offers;

}

const OFFERS = getOffers();
const DISCRIPTIONS = getDiscription();
const POINT_TYPE_ICON = getpointTypeIcon();

export {DISCRIPTIONS, OFFERS, DESTINATIONS_PHOTOS, DESTINATIONS, POINT_TYPE_ICON, POINT_TYPE};
