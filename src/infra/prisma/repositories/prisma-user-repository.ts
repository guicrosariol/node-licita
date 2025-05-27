import type { UserRepository } from "../../../domain/application/repositories/user-repository";
import type { User } from "../../../domain/entities/user";
import type { UserCompany } from "../../../domain/entities/user-company";

export class PrismaUserRepository implements UserRepository {
  create(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findById(userId: string): Promise<null | User> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  assignToCompany(userCompany: UserCompany): Promise<UserCompany> {
    throw new Error("Method not implemented.");
  }
  isAlreadyAssignedToCompany(userId: string, companyId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}