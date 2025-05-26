import type { UserRepository } from "../../../../domain/application/repositories/user-repository"
import type { User } from "../../../../domain/entities/user"

export class InMemoryUserRepository implements UserRepository {
  findById(userId: string): Promise<null | User> {
    throw new Error("Method not implemented.")
  }
  assignToCompany(userId: string, companyId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  isAlreadyAssignedToCompany(userId: string, companyId: string): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
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