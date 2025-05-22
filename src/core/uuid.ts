import { randomUUID } from "crypto";

export class UUID { 
  static create() {
    return randomUUID();
  }
}