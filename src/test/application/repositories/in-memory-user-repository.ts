import type { UserRepository } from "../../../domain/application/repositories/user-repository"
import type { User } from "../../../domain/entities/user"


export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.props.email === email
    )

    if (!user) {
      return null
    }

    return user
  }
}