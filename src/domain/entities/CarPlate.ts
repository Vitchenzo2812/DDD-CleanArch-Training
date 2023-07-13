import ApplicationError from "../error/ApplicationError";

export default class CarPlate {
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new ApplicationError("Invalid car plate", 400);
    this.value = value;
  }

  private validate(carPlate: string) {
    return String(carPlate)
            .toLowerCase()
            .match(
              /^[a-z]{3}[0-9]{4}$/
            );
  }
  
}