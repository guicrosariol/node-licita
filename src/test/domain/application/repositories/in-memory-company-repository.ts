import type { CompanyRepository } from "../../../domain/application/repositories/company-repository"
import type { FindByEmailOrCnpjParams } from "../../../domain/application/repositories/types/company"
import type { Company } from "../../../domain/entities/company"


export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = []

  async findById(companyId: string): Promise<null | Company> {
    const company = this.companies.find((company) => company.id.toString() === companyId)

    if (!company) {
      return null
    }

    return company
  }

  async create(company: Company): Promise<Company> {
    this.companies.push(company)
    return company
  }

  async findByEmailOrCnpj(params: FindByEmailOrCnpjParams): Promise<Company | null> {
    const company = this.companies.find((company) => company.props.email == params.email || company.props.cnpj == params.cnpj)

    if (!company) {
      return null
    }

    return company
  }
}