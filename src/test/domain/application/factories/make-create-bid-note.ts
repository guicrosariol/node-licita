import type { BidRepository } from "../../../../domain/application/repositories/bid-repository";
import type { CompanyRepository } from "../../../../domain/application/repositories/company-repository";
import { CreateBidNoteUseCase } from "../../../../domain/application/use-cases/create-bid-note";
import { InMemoryBidRepository } from "../repositories/in-memory-bid-repository";
import { InMemoryCompanyRepository } from "../repositories/in-memory-company-repository";

interface SharedRepositories {
  sharedBidRepository?: BidRepository
  sharedCompanyRepository?: CompanyRepository
}

export function MakeCreateBidNoteUseCase(sharedRepositories?: SharedRepositories) {
  const sharedBidRepository = sharedRepositories?.sharedBidRepository
  const sharedComapanyRepository = sharedRepositories?.sharedCompanyRepository

  const bidRepository = sharedBidRepository ?? new InMemoryBidRepository()
  const companyRepository = sharedComapanyRepository ?? new InMemoryCompanyRepository()

  const sut = new CreateBidNoteUseCase(bidRepository, companyRepository)

  return sut
}