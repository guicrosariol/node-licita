import { left, right, type Either } from "../../../core/either";
import { UserCompany } from "../../entities/user-company";
import type { CompanyRepository } from "../repositories/company-repository";
import type { UserRepository } from "../repositories/user-repository";
import { NotFoundError } from "./errors/not-found-error";

interface AssignUserToCompanyRequest {
  userId: string
  companyId: string
}

type AssignUserToCompanyResponse = Either<NotFoundError, UserCompany>

export class AssignUserToCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository,
  ) { }
  async execute({
    userId,
    companyId
  }: AssignUserToCompanyRequest): Promise<AssignUserToCompanyResponse> {
    const doesCompanyExist = await this.companyRepository.findById(companyId)

    if (!doesCompanyExist) {
      return left(new NotFoundError())
    }

    const doesUserExist = await this.userRepository.findById(userId)

    if (!doesUserExist) {
      return left(new NotFoundError())
    }

    const userCompanyToCreate = UserCompany.create({
      userId,
      companyId
    })

    const createdUserCompany = await this.userRepository.assignToCompany(userCompanyToCreate)

    return right(createdUserCompany)
  }
}