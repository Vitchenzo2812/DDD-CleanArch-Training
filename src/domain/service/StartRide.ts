import { PositionTypeInput } from "./PositionTypeInput";

export interface IStartRideService {
  execute(input: PositionTypeInput): Promise<void>
}