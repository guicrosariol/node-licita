import { left, right, type Either } from "../../../core/either";
import type { BidRepository } from "../repositories/bid-repository";
import { ActionAlreadyPerformedError } from "./errors/action-already-performed-error";
import { NotFoundError } from "./errors/not-found-error";

interface MarkBidAsManagedRequest {
  bidId: string
}

type MarkBidAsManagedResponse = Either<ActionAlreadyPerformedError | NotFoundError, null>

export class MarkBidAsManagedUseCase {
  constructor(
    private bidRepository: BidRepository
  ) { }
  async execute({
    bidId
  }: MarkBidAsManagedRequest): Promise<MarkBidAsManagedResponse> {
    const doesBidExist = await this.bidRepository.findById(bidId)

    if (!doesBidExist) {
      return left(new NotFoundError())
    }

    const isManaged = await this.bidRepository.checkIfManaged(bidId)

    if (isManaged) {
      return left(new ActionAlreadyPerformedError())
    }

    await this.bidRepository.markAsManaged(bidId)

    return right(null)
  }
}