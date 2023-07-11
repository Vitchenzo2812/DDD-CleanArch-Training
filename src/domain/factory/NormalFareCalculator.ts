import Segment from "../entities/Segment";
import FareCalculator from "./FareCalculator";

export default class NormalFareCalculator implements FareCalculator {
  private FARE = 2.1;

  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}