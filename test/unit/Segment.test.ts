import Segment from "../../src/domain/entities/Segment"
import ApplicationError from "../../src/domain/error/ApplicationError"

test.skip("should throw Error if distance of the segment is invalid", () => {
  expect(() => (Segment.create(-1, new Date("2023-07-06T10:00:00")))).toThrow(new ApplicationError("Invalid distance", 400))
})

test("should throw Error if date of the segment is invalid", () => {
  expect(() => (Segment.create(10, new Date("asdfsa")))).toThrow(new ApplicationError("Invalid date", 400))
})