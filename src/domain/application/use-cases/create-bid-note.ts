import { left, right, type Either } from "../../../core/either"
import { BidNote } from "../../entities/bid-note"
import type { BidRepository } from "../repositories/bid-repository"
import { NotFoundError } from "./errors/not-found-error"

interface CreateBidNoteRequest {
  bidId: string
  ownerId: string
  content: string
}

type CreateBidNoteResponse = Either<NotFoundError, BidNote>

export class CreateBidNoteUseCase {
  constructor(
    private bidRepository: BidRepository
  ) { }

  async execute({
    bidId,
    ownerId,
    content
  }: CreateBidNoteRequest): Promise<CreateBidNoteResponse> {
    const doesBidExist = await this.bidRepository.findByPncpId(bidId)
    if (!doesBidExist) {
      return left(new NotFoundError())
    }

    const bidNoteToCreate = BidNote.create({
      bidId,
      content,
      ownerId
    })

    const createdBidNote = await this.bidRepository.createNote(bidNoteToCreate)

    return right(createdBidNote)
  }
}