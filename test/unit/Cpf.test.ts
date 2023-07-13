import Cpf from "../../src/domain/entities/Cpf"

test.each([
  "392.350.525-64",
  "745.878.878-03",
  "24012928880",
])("should validate a cpf", (cpf) => {
  const cpfClient = new Cpf(cpf)
  expect(cpfClient).toBeInstanceOf(Cpf);
  expect(cpfClient.isValid()).toBeTruthy();
})

test("should return a cpf cleaned", () => {
  const cpfClient = new Cpf("392.350.525-64")
  expect(cpfClient.value).toBe("39235052564");
})

test.each([
  "392.450.583-61",
  "542.792.118-69",
  "76148229118",
])("should throw Error if invalid cpf", (cpf) => {
  expect(() => new Cpf(cpf)).toThrow(new Error("This document is invalid!"));
})

test("should throw Error if cpf length is invalid", () => {
  expect(() => new Cpf("12.27.48-5")).toThrow(new Error("Invalid cpf length"))
})

test.each([
  "111.111.111-11",
  "222.222.222-22",
  "333.333.333-33",
])("should throw Error if cpf contains all numbers the same", (cpf) => {
  expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf!"))
})