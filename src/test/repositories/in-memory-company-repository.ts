import type { CompanyRepository } from "../../domain/application/repositories/company-repository";
import type { FindByEmailOrCnpjParams } from "../../domain/application/repositories/types/company";
import type { Company } from "../../domain/entities/company";

export class InMemoryCompanyRepository implements CompanyRepository {
  private items: Company[] = []

  async create(company: Company): Promise<Company> {
    this.items.push(company)
    return company
  }

  async findByEmailOrCnpj(params: FindByEmailOrCnpjParams): Promise<Company | null> {
    const company = this.items.find((company) => company.props.email == params.email || company.props.cnpj == params.cnpj)

    if (!company) {
      return null
    }

    return company
  }
}