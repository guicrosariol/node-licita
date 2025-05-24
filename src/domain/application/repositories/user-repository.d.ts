import type { User, UserProps } from "../entities/user";
import type { findByEmailAndCnpjParams } from "./types/user";

export interface UserRepository {
  create(user: User): Promise<User>
  findByEmailAndCnpj(params: findByEmailAndCnpjParams): Promise<User | null>
}