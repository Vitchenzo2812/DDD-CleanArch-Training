import Auth from "../../src/application/service/Auth";
import { AuthServiceDTO } from "../../src/domain/service/Auth";
import ApplicationError from "../../src/domain/error/ApplicationError";
import DatabaseConnection from "../../src/application/contracts/DatabaseConnection";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";

let register: Auth;
let connection: DatabaseConnection

beforeAll(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection)
  register = new Auth(repositoryFactory)
})

test("should register a passenger", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: "passenger",
    name: "Guilherme",
    email: "gvitchenzo@gmail.com",
    document: "392.350.525-64"
  }

  const output = await register.SignUp(input);
  expect(output).toBeDefined();
})

test("should register a driver", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: "driver",
    name: "Lucas",
    email: "teste@gmail.com",
    document: "392.350.525-64",
    car_plate: "AAA9999"
  }

  const output = await register.SignUp(input);
  expect(output).toBeDefined();
})

test("should throw Error if register a driver without car plate", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: "driver",
    name: "Lucas Gouveia",
    email: "lukasas12@gmail.com",
    document: "392.350.525-64",
    car_plate: ""
  }

  await expect(() => register.SignUp(input)).rejects.toThrow(new ApplicationError("Driver must have a car plate!", 400))
})

test("should throw Error if passenger's document is invalid", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: "passenger",
    name: "Guilherme",
    email: "gvit@gmail.com",
    document: "792.610.555-64"
  }

  await expect(() => register.SignUp(input)).rejects.toThrow(new ApplicationError("This document is invalid!", 400));
})

afterAll(async () => {
  await connection.close();
})