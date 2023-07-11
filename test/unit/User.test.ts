import User from "../../src/domain/entities/User";
import ApplicationError from "../../src/domain/error/ApplicationError";

test("should create a passenger", () => {
  const user = new User('id-test', 'passenger', 'Guilherme', 'gvitchenzo@gmail.com', 'cpf-test');
  expect(user).toBeDefined();
  expect(user).toBeInstanceOf(User); 
})

test("should create a driver", () => {
  const user = new User('id-test', 'driver', 'Guilherme', 'gvitchenzo@gmail.com', 'cpf-test', 'AAA9999');
  expect(user).toBeDefined();
  expect(user).toBeInstanceOf(User); 
})

test("should throw Error if create driver without car plate", () => {
  expect(() => new User('id-test', 'driver', 'João', 'jao112@gmail.com', 'cpf-test', '')).toThrow(new ApplicationError("Driver must have a car plate!", 400));
})

test("should throw Error if user params are undefined", () => {
  expect(() => new User('', 'driver', 'João', '', 'cpf-test', 'AAA9999')).toThrow(new ApplicationError("All fields must be filled!", 400));
})