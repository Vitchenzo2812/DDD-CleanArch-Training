import Email from "../../src/domain/entities/Email"
import ApplicationError from "../../src/domain/error/ApplicationError";

test("should validate a email valid", () => {
  const email = new Email("test221@gmail.com")
  expect(email).toBeInstanceOf(Email);
  expect(email.value).toBe("test221@gmail.com")
})

test("should throw Error if email is invalid", () => {
  expect(() => new Email("123@dhsalkn")).toThrow(new ApplicationError("Invalid Email", 400))
})