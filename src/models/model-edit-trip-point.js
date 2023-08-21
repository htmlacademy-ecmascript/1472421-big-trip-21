import { generateTripPoint } from '../mock/trip-point';


export default class EditTripPointModel {

  editTripPoints =  generateTripPoint();

  getTripPoint(){
    return this.editTripPoints;
  }
}
