import Segment from "../../domain/entities/Segment";

export default interface FareCalculator {
  calculate(segment: Segment): number;
}