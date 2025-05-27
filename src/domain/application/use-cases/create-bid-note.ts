import { left, right, type Either } from "../../../core/either"
import { BidNote } from "../../entities/bid-note"
import type { BidRepository } from "../repositories/bid-repository"
import type { CompanyRepository } from "../repositories/company-repository"
import type { UserRepository } from "../repositories/user-repository"
import { NotFoundError } from "./errors/not-found-error"

interface CreateBidNoteRequest {
  id?: string,
  ownerId: string,
  bidId: string
  companyId: string
  content: string
}

type CreateBidNoteResponse = Either<NotFoundError, BidNote>

export class CreateBidNoteUseCase {
  constructor(
    private bidRepository: BidRepository,
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository
  ) { }

  async execute({
    id,
    bidId,
    ownerId,
    companyId,
    content
  }: CreateBidNoteRequest): Promise<CreateBidNoteResponse> {
    const doesCompanyExist = await this.companyRepository.findById(companyId)

    if (!doesCompanyExist) {
      return left(new NotFoundError())
    }

    const doesOwnerExist = await this.userRepository.findById(ownerId)

    if (!doesOwnerExist) {
      return left(new NotFoundError())
    }

    const doesBidExist = await this.bidRepository.findById(bidId)
    if (!doesBidExist) {
      return left(new NotFoundError())
    }

    const bidNoteToCreate = BidNote.create({
      bidId,
      ownerId,
      content,
      companyId
    }, id)

    const createdBidNote = await this.bidRepository.createNote(bidNoteToCreate)

    return right(createdBidNote)
  }
}