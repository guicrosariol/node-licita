import { CreateCompanyUseCase } from '../../domain/application/use-cases/create-company'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'

export function makeCreateCompanyUseCase() {
  const companyRepository = new InMemoryCompanyRepository()
  const sut = new CreateCompanyUseCase(companyRepository)

  return sut
}