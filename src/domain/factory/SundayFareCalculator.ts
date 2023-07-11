import Segment from "../entities/Segment";
import FareCalculator from "./FareCalculator";

export default class SundayFareCalculator implements FareCalculator {
  private FARE = 2.9;
  
  calculate(segment: Segment): number {
    return segment.distance * this.FARE;
  }
}