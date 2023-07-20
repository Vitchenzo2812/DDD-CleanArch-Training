import FareCalculatorFactory from "../factory/FareCalculatorFactory";
import Coord from "./Coord";
import DistanceCalculator from "./DistanceCalculator";
import Segment from "./Segment";

export default class CalculateRide {
  distance: number;
  private segments: Segment[];
	private MIN_PRICE = 10;

  constructor() {
    this.distance = 0;
		this.segments = [];
  }

  addSegment (from: Coord, to: Coord, date: Date) {
		this.distance = DistanceCalculator.calculate(from, to);
    this.segments.push(new Segment(this.distance, date));
	}

	calculate () {
		let price = 0;
		for (const segment of this.segments) {
			const fareCalculator = FareCalculatorFactory.create(segment);
			price += fareCalculator.calculate(segment)
		}
		return Math.max(this.MIN_PRICE, +price.toFixed(2))
	}
}