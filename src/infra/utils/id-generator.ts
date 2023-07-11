import * as uuid from 'uuid';
import IUuidGenerator from "../../application/contracts/IUuidGenerator";

export default class IdGenerator implements IUuidGenerator {
  generate(): string {
    return uuid.v4();
  }
}