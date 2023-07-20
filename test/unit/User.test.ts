import User from "../../src/domain/entities/User";
import ApplicationError from "../../src/domain/error/ApplicationError";

test("should create a passenger", () => {
  const user = User.create('passenger', 'Guilherme', 'gvitchenzo@gmail.com', '89578282656');
  expect(user).toBeInstanceOf(User); 
  expect(user.name).toBe('Guilherme');
  expect(user.email.value).toBe('gvitchenzo@gmail.com');
})

test("should create a driver", () => {
  const user = User.create('driver', 'Guilherme', 'gvitchenzo@gmail.com', '89578282656', 'AAA9999');
  expect(user).toBeInstanceOf(User);
  expect(user.type).toBe('driver');
  expect(user.car_plate).toBe('AAA9999');
})

test("should throw Error if create driver without car plate", () => {
  expect(() => User.create('driver', 'João', 'jao112@gmail.com', '89578282656', '')).toThrow(new ApplicationError("Driver must have a car plate!", 400));
})

test("should throw Error if user params are undefined", () => {
  expect(() => User.create('driver', 'João', '', '89578282656', 'AAA9999')).toThrow(new ApplicationError("All fields must be filled!", 400));
})