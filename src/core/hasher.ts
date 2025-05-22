import { hash } from "bcryptjs";

export class Hasher {
  static async hash(value: string, saltRounds: number): Promise<string> {
    return await hash(value, saltRounds);
  }
}