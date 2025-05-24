import { CreateBidUseCase } from '../../domain/application/use-cases/create-bid'
import { InMemoryBidRepository } from '../repositories/in-memory-bid-repository'

export function makeCreateBidUseCase() {
  const bidRepository = new InMemoryBidRepository()
  const sut = new CreateBidUseCase(bidRepository)

  return sut
}