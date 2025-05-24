import type { CompanyRepository } from '../../domain/application/repositories/company-repository'
import { CreateBidUseCase } from '../../domain/application/use-cases/create-bid'
import { InMemoryBidRepository } from '../repositories/in-memory-bid-repository'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'

export function makeCreateBidUseCase(optionalCompanyRepository?: CompanyRepository) {
  const companyRepository = optionalCompanyRepository ?? new InMemoryCompanyRepository()
  const bidRepository = new InMemoryBidRepository()
  const sut = new CreateBidUseCase(companyRepository, bidRepository)

  return sut
}