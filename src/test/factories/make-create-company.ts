import type { CompanyRepository } from '../../domain/application/repositories/company-repository'
import { CreateCompanyUseCase } from '../../domain/application/use-cases/create-company'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'

export function makeCreateCompanyUseCase(optionalCompanyRepository?: CompanyRepository) {
  const companyRepository = optionalCompanyRepository ?? new InMemoryCompanyRepository()
  const sut = new CreateCompanyUseCase(companyRepository)

  return sut
}