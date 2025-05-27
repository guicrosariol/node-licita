import type { UserRepository } from "../../../domain/application/repositories/user-repository";
import { User } from "../../../domain/entities/user";
import type { UserCompany } from "../../../domain/entities/user-company";
import { prisma } from "../prisma";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.props.name,
        email: user.props.email,
        password_hash: user.props.passwordHash
      }
    })

    return User.create({
      name: createdUser.name,
      email: createdUser.email,
      passwordHash: createdUser.password_hash,
    }, createdUser.id)
  }
  async findById(userId: string): Promise<null | User> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return user ? User.create({
      name: user?.name,
      email: user?.email,
      passwordHash: user?.password_hash
    }) : null
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user ? User.create({
      name: user?.name,
      email: user?.email,
      passwordHash: user?.password_hash
    }) : null
  }
  assignToCompany(userCompany: UserCompany): Promise<UserCompany> {
    throw new Error("Method not implemented.");
  }
  isAlreadyAssignedToCompany(userId: string, companyId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}