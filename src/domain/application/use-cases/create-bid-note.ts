import { left, right, type Either } from "../../../core/either"
import { BidNote } from "../../entities/bid-note"
import type { BidRepository } from "../repositories/bid-repository"
import { AlreadyExistError } from "./errors/already-exist-error"
import { NotFoundError } from "./errors/not-found-error"

interface CreateBidNoteRequest {
  bidId: string
  companyId: string
  content: string
}

type CreateBidNoteResponse = Either<NotFoundError, BidNote>

export class CreateBidNoteUseCase {
  constructor(
    private bidRepository: BidRepository
  ) { }

  async execute({
    bidId,
    companyId,
    content
  }: CreateBidNoteRequest): Promise<CreateBidNoteResponse> {
    const doesBidExist = await this.bidRepository.findById(bidId)
    if (!doesBidExist) {
      return left(new AlreadyExistError())
    }

    const bidNoteToCreate = BidNote.create({
      bidId,
      content,
      companyId
    })

    const createdBidNote = await this.bidRepository.createNote(bidNoteToCreate)

    return right(createdBidNote)
  }
}