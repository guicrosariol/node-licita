import { left, right, type Either } from "../../../core/either";
import { Company, CompanyProps } from "../../entities/company";
import type { CompanyRepository } from "../repositories/company-repository";
import { AlreadyExistError } from "./errors/already-exist-error";

type CreateCompanyResponse = Either<AlreadyExistError, Company>

export class CreateCompanyUseCase {
  constructor(
    private companyRepository: CompanyRepository
  ) { }

  async execute({
    id,
    name,
    email,
    cnpj
  }: CompanyProps): Promise<CreateCompanyResponse> {
    const companyAlreadyExist = await this.companyRepository.findByEmailOrCnpj({
      email,
      cnpj
    });

    if (companyAlreadyExist) {
      return left(new AlreadyExistError())
    };

    const companyToCreate = Company.create({
      name,
      email,
      cnpj,
    }, id);

    const createdCompany = await this.companyRepository.create(companyToCreate);

    return right(createdCompany)
  };
}