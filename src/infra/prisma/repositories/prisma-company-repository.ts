import type { CompanyRepository } from "../../../domain/application/repositories/company-repository";
import type { Company } from "../../../domain/entities/company";

export class PrismaCompanyRepository implements CompanyRepository {
  create(company: Company): Promise<Company> {
    throw new Error("Method not implemented.");
  }
  findById(companyId: string): Promise<null | Company> {
    throw new Error("Method not implemented.");
  }
  findByEmailOrCnpj(email: string, cnpj: string): Promise<Company | null> {
    throw new Error("Method not implemented.");
  }
}