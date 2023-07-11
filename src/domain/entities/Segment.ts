import ApplicationError from "../error/ApplicationError";

export default class Segment {

	constructor (readonly distance: number, readonly date: Date) {
		if (!this.isValidDistance()) throw new ApplicationError("Invalid distance", 400);
		if (!this.isValidDate()) throw new ApplicationError("Invalid date", 400);
	}

	isOvernight () {
		return this.date.getHours() >= 22 || this.date.getHours() <= 6;
	}
	
	isSunday () {
		return this.date.getDay() === 0;
	}
	
	isValidDistance () {
		return this.distance && typeof this.distance === "number" && this.distance > 0;
	}
	
	isValidDate () {
		return this.date && this.date instanceof Date && this.date.toString() !== "Invalid Date";
	}
}