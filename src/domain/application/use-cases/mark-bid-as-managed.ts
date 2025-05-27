import { left, right, type Either } from "../../../core/either";
import type { BidRepository } from "../repositories/bid-repository";
import type { CompanyRepository } from "../repositories/company-repository";
import { ActionAlreadyPerformedError } from "./errors/action-already-performed-error";
import { ForbiddenError } from "./errors/forbidden-error";
import { NotFoundError } from "./errors/not-found-error";

interface MarkBidAsManagedRequest {
  bidId: string
  companyId: string
}

type MarkBidAsManagedResponse = Either<ActionAlreadyPerformedError | NotFoundError, null>

export class MarkBidAsManagedUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private bidRepository: BidRepository
  ) { }
  async execute({
    companyId,
    bidId
  }: MarkBidAsManagedRequest): Promise<MarkBidAsManagedResponse> {
    const bid = await this.bidRepository.findById(bidId)

    if (!bid) {
      return left(new NotFoundError())
    }

    const doesCompanyExist = await this.companyRepository.findById(companyId)

    if (!doesCompanyExist) {
      return left(new NotFoundError())
    }

    if (bid.props.companyId != companyId) {
      return left(new ForbiddenError())
    }

    const isManaged = await this.bidRepository.checkIfManaged(bidId)

    if (isManaged) {
      return left(new ActionAlreadyPerformedError())
    }

    await this.bidRepository.markAsManaged(bidId)

    return right(null)
  }
}