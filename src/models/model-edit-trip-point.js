import { generateTripPoint } from '../mock/trip-point';


export default class EditTripPointModel {

  editTripPoints = generateTripPoint();

  getEditTripPoint(){
    return this.editTripPoints;
  }
}
