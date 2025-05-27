import type { UserRepository } from "../../domain/application/repositories/user-repository"
import type { User } from "../../domain/entities/user"
import type { UserCompany } from "../../domain/entities/user-company"

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []
  public user_company: UserCompany[] = []

  async findById(userId: string): Promise<null | User> {
    const user = this.users.find((user) => user.id.toString() === userId)

    if (!user) {
      return null
    }

    return user
  }
  async assignToCompany(userCompany: UserCompany): Promise<UserCompany> {
    this.user_company.push(userCompany)
    return userCompany
  }
  async isAlreadyAssignedToCompany(userId: string, companyId: string): Promise<boolean> {
    const isAssigned = this.user_company.some((userCompany) => userCompany.props.userId === userId && userCompany.props.companyId === companyId)

    return isAssigned
  }

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