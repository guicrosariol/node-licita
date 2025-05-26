import { left, right, type Either } from "../../../core/either";
import type { CompanyRepository } from "../repositories/company-repository";
import type { UserRepository } from "../repositories/user-repository";
import { ActionAlreadyPerformedError } from "./errors/action-already-performed-error";
import { ForbiddenError } from "./errors/forbidden-error";
import { NotFoundError } from "./errors/not-found-error";

interface AssignUserToCompanyRequest {
  userId: string,
  companyId: string
}

type AssignUserToCompanyResponse = Either<NotFoundError | ActionAlreadyPerformedError | ForbiddenError, null>

export class AssignUserToCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository
  ) { }

  async execute({
    userId,
    companyId
  }: AssignUserToCompanyRequest): Promise<AssignUserToCompanyResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new NotFoundError())
    }

    if (!company.canAddUser) {
      return left(new ForbiddenError())
    }

    const doesUserExist = await this.userRepository.findById(userId)

    if (!doesUserExist) {
      return left(new NotFoundError())
    }

    const isAlreadyAssigned = await this.userRepository.isAlreadyAssignedToCompany(userId, companyId)

    if (isAlreadyAssigned) {
      return left(new ActionAlreadyPerformedError())
    }

    await this.userRepository.assignToCompany(userId, companyId)

    return right(null)
  }
}