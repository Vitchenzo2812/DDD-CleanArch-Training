import Segment from "../entities/Segment";
import FareCalculator from "./FareCalculator";

export default class OvernightFareCalculator implements FareCalculator {
  private FARE = 3.9;
  
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}