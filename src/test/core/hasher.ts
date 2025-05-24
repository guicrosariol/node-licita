import type { Hasher } from "../../core/hasher";

export class FakeHasher implements Hasher {
  async hash(plain: string, salt: number): Promise<string> {
    return `${plain}-hashed-${salt}`
  }
}