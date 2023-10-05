import Observable from '../framework/observable';
import { adaptedToClient } from '../utils/adapter';
import { UpdateType } from '../const';

export default class TripPointsModel extends Observable {

  /* Создает массив из четырех элементов.
     Каждый элемент является моковым объектом точки маршрута.
     {length:POINT_COUNT} - означает, что мы передаем в .from массивоподнобный объект
     масивоподобный потому, что мы прописываем ему свойство length(длинна)
  */
  #tripPoints = [];

  #pointsApiService = null;
  #destinations = null;
  #offers = null;


  constructor({pointsApiService, destinationsModel, offersModel}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinations = destinationsModel;
    this.#offers = offersModel;
  }

  async init() {

    try{
      await Promise.all([
        this.#destinations.init(),
        this.#offers.init()
      ]);

      const points = await this.#pointsApiService.getPoints();

      this.#tripPoints = points.map(adaptedToClient);

    } catch(err) {
      this.#tripPoints = [];
    }

    this._notify(UpdateType.INIT);
  }

  get tripPoints(){
    return this.#tripPoints;
  }

  updatePoint(updateType, update) {
    /* Получаем id элемента массива, соответсвующего заданному условию
    (поле id точки маршрута в массиве соответсвует полю id точки, в которой что-то обновилось) */
    const index = this.#tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    /* В массив данных ТМ помещаем вырезку из массива ТМ от 0 элемента до элемента
    находящегося по индексу index */
    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      /* Следующим элементом кладем ТМ с обновленными данными */
      update,
      /* Далее кладем все элементы следующие после элемента с индексом index */
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {

    /* Добавляем новую точку в начало массива данных ТМ */
    this.#tripPoints = [
      update,
      ...this.#tripPoints
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
