import * as uuid from 'uuid';

export default class UUIDGenerator {
  static generate() {
    return uuid.v4();
  }
}