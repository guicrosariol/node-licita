import type { findByEmailAndCnpjParams } from "../../domain/application/repositories/types/user";
import type { UserRepository } from "../../domain/application/repositories/user-repository";
import type { User } from "../../domain/entities/user";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(user: User): Promise<User> {
    this.items.push(user)
    return user
  }

  async findByEmailAndCnpj({ email, cnpj }: findByEmailAndCnpjParams): Promise<User | null> {
    const user = this.items.find(
      (user) => user.props.email === email && user.props.cnpj === cnpj
    )

    if (!user) {
      return null
    }

    return user
  }
}