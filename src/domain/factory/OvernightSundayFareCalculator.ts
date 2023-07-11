import Segment from "../entities/Segment";
import FareCalculator from "./FareCalculator";

export default class OvernightSundayFareCalculator implements FareCalculator {
  private FARE = 5;
  
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}