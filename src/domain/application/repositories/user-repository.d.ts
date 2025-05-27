import type { UserCompany } from "../../entities/user-company";
import type { User, UserProps } from "../entities/user";
import type { IsAlreadyAssignedToCompanyParams } from "./types/user";
import type { AssignToCompanyParams } from "./types/user";

export interface UserRepository {
  create(user: User): Promise<User>
  findById(userId: string): Promise<null | User>
  findByEmail(email: string): Promise<User | null>
  assignToCompany(userCompany: UserCompany): Promise<UserCompany>
  isAlreadyAssignedToCompany(userId: string, companyId: string): Promise<boolean>
}