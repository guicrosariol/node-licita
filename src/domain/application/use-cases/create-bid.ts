import { left, right, type Either } from "../../../core/either"
import { Bid } from "../../entities/bid"
import type { BidRepository } from "../repositories/bid-repository"
import { AlreadyExistError } from "./errors/already-exist-error"

interface CreateBidRequest {
  id?: string,
  pncpId: string
}

type CreateBidResponse = Either<AlreadyExistError, Bid>

export class CreateBidUseCase {
  constructor(
    private bidRepository: BidRepository
  ) { }

  async execute({
    id,
    pncpId
  }: CreateBidRequest): Promise<CreateBidResponse> {
    const bidAlreadyExist = await this.bidRepository.findByPncpId(pncpId)
    if (bidAlreadyExist) {
      return left(new AlreadyExistError())
    }

    const bidToCreate = Bid.create({
      id,
      pncpId
    })

    const createdBid = await this.bidRepository.create(bidToCreate)

    return right(createdBid)
  }
}