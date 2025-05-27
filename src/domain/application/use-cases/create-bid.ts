import { left, right, type Either } from "../../../core/either"
import { Bid } from "../../entities/bid"
import type { BidRepository } from "../repositories/bid-repository"
import type { CompanyRepository } from "../repositories/company-repository"
import { AlreadyExistError } from "./errors/already-exist-error"
import { NotFoundError } from "./errors/not-found-error"

interface CreateBidRequest {
  id?: string,
  companyId: string,
  pncpId: string
}

type CreateBidResponse = Either<AlreadyExistError | NotFoundError, Bid>

export class CreateBidUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private bidRepository: BidRepository
  ) { }

  async execute({
    id,
    companyId,
    pncpId
  }: CreateBidRequest): Promise<CreateBidResponse> {
    const doesCompanyExist = await this.companyRepository.findById(companyId)

    if (!doesCompanyExist) {
      return left(new NotFoundError())
    }

    const bidAlreadyExist = await this.bidRepository.findByPncpAndCompany(pncpId, companyId)
    
    if (bidAlreadyExist) {
      return left(new AlreadyExistError())
    }

    const bidToCreate = Bid.create({
      companyId,
      pncpId
    }, id)

    const createdBid = await this.bidRepository.create(bidToCreate)

    return right(createdBid)
  }
}