import type { CompanyRepository } from '../../../../domain/application/repositories/company-repository'
import { CreateCompanyUseCase } from '../../../../domain/application/use-cases/create-company'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'

interface SharedRepositories {
  sharedCompanyRepository?: CompanyRepository
}

export function makeCreateCompanyUseCase(sharedRepositories?: SharedRepositories) {
  const sharedCompanyRepository = sharedRepositories?.sharedCompanyRepository

  const companyRepository = sharedCompanyRepository ?? new InMemoryCompanyRepository()

  const sut = new CreateCompanyUseCase(companyRepository)

  return sut
}