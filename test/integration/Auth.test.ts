import DatabaseConnection from "../../src/application/contracts/DatabaseConnection";
import Auth from "../../src/application/service/Auth";
import { AuthServiceDTO } from "../../src/domain/service/Auth";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import IdGenerator from "../../src/infra/utils/id-generator";
import ApplicationError from "../../src/domain/error/ApplicationError";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let register: Auth;
let connetion: DatabaseConnection; 

beforeEach(async () => {
  connetion = new PgPromiseAdapter()
  await connetion.connect()
  const repositoryFactory = new DatabaseRepositoryFactory(connetion)
  const idGenerator = new IdGenerator()
  register = new Auth(repositoryFactory, idGenerator)
})

test("should register a passenger", async () => {
  const input: AuthServiceDTO.AuthInputSignUp = {
    type: "passenger",
    name: "Guilherme",
    email: "gvitchenzo@gmail.com",
    document: "392.350.525-64"
  }

  const output = await register.SignUp(input);
  expect(output).toBeDefined();
})

test("should register a driver", async () => {
  const input: AuthServiceDTO.AuthInputSignUp = {
    type: "driver",
    name: "João",
    email: "teste@gmail.com",
    document: "392.350.525-64",
    car_plate: "AAA9999"
  }

  const output = await register.SignUp(input);
  expect(output).toBeDefined();
})

test("should throw Error if register a driver without car plate", async () => {
  const input: AuthServiceDTO.AuthInputSignUp = {
    type: "driver",
    name: "Lucas Gouveia",
    email: "lukasas12@gmail.com",
    document: "392.350.525-64",
    car_plate: ""
  }

  await expect(() => register.SignUp(input)).rejects.toThrow(new ApplicationError("Driver must have a car plate!", 400))
})

test("should throw Error if passenger's document is invalid", async () => {
  const input: AuthServiceDTO.AuthInputSignUp = {
    type: "passenger",
    name: "Guilherme",
    email: "gvitchenzo@gmail.com",
    document: "792.610.555-64"
  }

  await expect(() => register.SignUp(input)).rejects.toThrow(new ApplicationError("This document is invalid!", 400));
})

afterEach(async () => {
  await connetion.close();
})