import { PositionTypeInput } from "./PositionTypeInput";

export interface IEndRideService {
  execute(input: PositionTypeInput): Promise<void>
}