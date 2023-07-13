import ApplicationError from "../error/ApplicationError";
import Cpf from "./Cpf";
import Email from "./Email";
import UUIDGenerator from "./UUIDGenerator";

export default class User {
  document: Cpf;
  email: Email;

  constructor(
    readonly id: string,
    readonly type: 'passenger' | 'driver',
    readonly name: string,
    email: string,
    document: string,
    readonly car_plate?: string
  ) {
    if (!id || !name || !email || !document) throw new ApplicationError("All fields must be filled!", 400);
    if (type === "driver" && !car_plate) throw new ApplicationError("Driver must have a car plate!", 400);
    this.document = new Cpf(document);
    this.email = new Email(email);
  }

  static create(type: 'passenger' | 'driver', name: string, email: string, document: string, car_plate?: string) {
    const id = UUIDGenerator.generate();
    return new User(id, type, name, email, document, car_plate);
  }
}