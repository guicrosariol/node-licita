import { left, right, type Either } from "../../../core/either";
import { Company } from "../../entities/company";
import type { CompanyRepository } from "../repositories/company-repository";
import type { UserRepository } from "../repositories/user-repository";
import { AlreadyExistError } from "./errors/already-exist-error";
import { NotFoundError } from "./errors/not-found-error";

interface CreateCompanyRequest {
  id?: string
  name: string
  ownerId: string
  email: string
  cnpj: string
}

type CreateCompanyResponse = Either<AlreadyExistError, Company>

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository
  ) { }

  async execute({
    id,
    name,
    email,
    ownerId,
    cnpj
  }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const companyAlreadyExist = await this.companyRepository.findByEmailOrCnpj(email, cnpj);

    if (companyAlreadyExist) {
      return left(new AlreadyExistError())
    };

    const doesOwnerExist = await this.userRepository.findById(ownerId)

    if (!doesOwnerExist) {
      return left(new NotFoundError())
    }

    const companyToCreate = Company.create({
      ownerId,
      name,
      email,
      cnpj,
      maximumUsers: 1,
      currentUsers: 1,
    }, id);

    const createdCompany = await this.companyRepository.create(companyToCreate);

    return right(createdCompany)
  };
}