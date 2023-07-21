import { PositionTypeInput } from "./PositionTypeInput";

export interface IUpdateRide {
  execute(input: PositionTypeInput): Promise<void>
}