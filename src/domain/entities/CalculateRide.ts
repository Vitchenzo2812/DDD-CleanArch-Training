import FareCalculatorFactory from "../factory/FareCalculatorFactory";
import DistanceCalculator from "./DistanceCalculator";
import Position from "./Position";
import Segment from "./Segment";

export default class CalculateRide {
  distance: number;
	private positions: Position[];
	private MIN_PRICE = 10;

  constructor() {
    this.distance = 0;
		this.positions = []
  }

	addPosition (ride_id: string, coords: { lat: number, long: number }, date: Date) {
		this.positions.push(Position.create(ride_id, coords, date))
	}

	calculate () {
		let price = 0;
		for (const [index, position] of this.positions.entries()) {
			const nextPosition = this.positions[index + 1]
			if(!nextPosition) break;
			this.distance = DistanceCalculator.calculate(position.coords, nextPosition.coords)
			const segment = Segment.create(this.distance, nextPosition.date)
			const fareCalculator = FareCalculatorFactory.create(segment);
			price += fareCalculator.calculate(segment)
		}
		return {
			distance: this.distance,
			price: Math.max(this.MIN_PRICE, +price.toFixed(2))
		}
	}
}