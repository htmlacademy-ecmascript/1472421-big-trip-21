import { render } from '../render.js';
import TripSortForm from '../view/view-trip-sort-form.js';
import TripList from '../view/view-trip-events-list.js';
import TripListItem from '../view/view-trip-events-item.js';
import TripEventsEditPoint from '../view/view-trip-edit-point.js';
import TripEventsPoint from '../view/view-trip-events-point.js';


export default class tripListPresenter{
  tripSortForm = new TripSortForm();
  tripList = new TripList();
  tripListItemEdit = new TripListItem();
  tripListItemPoint = new TripListItem();

  /* Добавляем возможность получать на вход в конструкторе массив точек маршрута
    tripPointsModel и записываем массив в свойства
  */
  constructor({tripEventsContainer, tripPointsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.tripPointsModel = tripPointsModel;
  }

  init() {
    /* Создаем свойство, в котором будет храниться копия массива моковох данных точек маршрута*/
    this.tripPoints = [...this.tripPointsModel.getTripPoint()].slice(0,3);

    render(this.tripSortForm, this.tripEventsContainer);

    render(this.tripList, this.tripEventsContainer);
    render(this.tripListItemEdit, this.tripList.getElement());
    render(new TripEventsEditPoint(this.tripPointsModel.getTripPoint().pop()), this.tripListItemEdit.getElement());

    for(let i = 0; i < 3; i++){
      /* Добавляем в список точек маршрута tripList элемент списка <li>*/
      render(this.tripListItemPoint, this.tripList.getElement());
      /* Добавляем в элемент списка <li> экземпляр класса точка маршрута(TripEventsPoint)
        который в конструктор принимает элемент из массива моковых данных
      */
      render(new TripEventsPoint({tripPoint: this.tripPoints[i]}), this.tripListItemPoint.getElement());
    }
  }
}
