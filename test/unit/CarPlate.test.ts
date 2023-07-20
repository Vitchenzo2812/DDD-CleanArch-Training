import CarPlate from "../../src/domain/entities/CarPlate"
import ApplicationError from "../../src/domain/error/ApplicationError"

test("should validate car plate valid", () => {
  const carPlate = new CarPlate("DPL4373")
  expect(carPlate.value).toBe("DPL4373")
})

test("should throw Error if car plate is invalid", () => {
  expect(() => new CarPlate("82A746B")).toThrow(new ApplicationError("Invalid car plate", 400))
})