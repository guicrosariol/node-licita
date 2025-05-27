export interface Hasher {
  hash(payload: string, saltOrRounds: number): Promise<string>;
}
