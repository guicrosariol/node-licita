import { hash } from "bcryptjs";
import type { Hasher } from "../../core/hasher";

export class HasherString implements Hasher {
  async hash(payload: string, saltOrRounds: number): Promise<string> {
    return await hash(payload, saltOrRounds);
  }
}