import ApplicationError from "../error/ApplicationError";
import UUIDGenerator from "./UUIDGenerator";

export default class Segment {

	private constructor (readonly id: string, readonly distance: number, readonly date: Date) {
		if (!this.isValidDistance()) throw new ApplicationError("Invalid distance", 400);
		if (!this.isValidDate()) throw new ApplicationError("Invalid date", 400);
	}

	static create(distance: number, date: Date) {
		const id = UUIDGenerator.generate();
		return new Segment(id, distance, date);
	}
	
	static restore(id: string, distance: number, date: Date) {
		return new Segment(id, distance, date);
	}

	isOvernight () {
		return this.date.getHours() >= 22 || this.date.getHours() <= 6;
	}
	
	isSunday () {
		return this.date.getDay() === 0;
	}
	
	isValidDistance () {
		return this.distance && typeof this.distance === "number";
	}
	
	isValidDate () {
		return this.date && this.date instanceof Date && this.date.toString() !== "Invalid Date";
	}
}