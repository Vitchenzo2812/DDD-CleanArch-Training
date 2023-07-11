import ApplicationError from "../error/ApplicationError";

export default class User {

  constructor(
    readonly id: string,
    readonly type: 'passenger' | 'driver',
    readonly name: string,
    readonly email: string,
    readonly document: string,
    readonly car_plate?: string
  ) {
    if (!id || !name || !email || !document) throw new ApplicationError("All fields must be filled!", 400);
    if (type === "driver" && !car_plate) throw new ApplicationError("Driver must have a car plate!", 400);
  }
}