import type { BidRepository } from '../../../domain/application/repositories/bid-repository'
import type { CompanyRepository } from '../../../domain/application/repositories/company-repository'
import { CreateBidUseCase } from '../../../domain/application/use-cases/create-bid'
import { InMemoryBidRepository } from '../repositories/in-memory-bid-repository'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'

interface SharedRepositories {
  sharedCompanyRepository?: CompanyRepository
  sharedBidRepository?: BidRepository
}

export function makeCreateBidUseCase(sharedRepositories?: SharedRepositories) {
  const sharedCompanyRepository = sharedRepositories?.sharedCompanyRepository
  const sharedBidRepository = sharedRepositories?.sharedBidRepository

  const companyRepository = sharedCompanyRepository ?? new InMemoryCompanyRepository()
  const bidRepository = sharedBidRepository ?? new InMemoryBidRepository()

  const sut = new CreateBidUseCase(companyRepository, bidRepository)

  return sut
}