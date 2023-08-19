import { render } from '../render.js';
import TripSortForm from '../view/trip-sort-form.js';
import TripEventsList from '../view/trip-events-list.js';
import TripEventsItem from '../view/trip-events-item.js';
import TripEventsEditPoint from '../view/trip-events-edit-point.js';
import TripEventsPoint from '../view/trip-events-point.js';



export default class TripEventsPresenter{
  tripSortForm = new TripSortForm();
  tripEventsList = new TripEventsList();
  tripEventsItemEdit = new TripEventsItem();
  tripEventsItemPoint = new TripEventsItem();

  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({tripEventsContainer, tripPointsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.tripPointsModel = tripPointsModel;
  }

  init() {
    /* Создаем свойство, в котором будет храниться копия массива моковох данных точек маршрута*/
    this.tripPoints = [...this.tripPointsModel.getTripPoint()]

    render(this.tripSortForm, this.tripEventsContainer);

    render(this.tripEventsList, this.tripEventsContainer);
    render(this.tripEventsItemEdit, this.tripEventsList.getElement());
    render(new TripEventsEditPoint(), this.tripEventsItemEdit.getElement());

    for(let i = 0; i < 3; i++){
      /* Добавляем в список точек маршрута tripEventsList элемент списка <li>*/
      render(this.tripEventsItemPoint, this.tripEventsList.getElement());
      /* Добавляем в элемент списка <li> экземпляр класса точка маршрута(TripEventsPoint)
        который в конструктор принимает элемент из массива моковых данных
      */
      render(new TripEventsPoint({tripPoint: this.tripPoints[i]}), this.tripEventsItemPoint.getElement());
    }
  }
}
