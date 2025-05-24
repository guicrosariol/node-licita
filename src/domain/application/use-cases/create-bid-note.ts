import { right, type Either } from "../../../core/either"
import { BidNote } from "../../entities/bid-note"
import type { BidRepository } from "../repositories/bid-repository"

interface CreateBidNoteRequest {
  bidId: string
  ownerId: string
  content: string
}

type CreateBidNoteResponse = Either<null, BidNote>

export class CreateBidNoteUseCase {
  constructor(
    private bidRepository: BidRepository
  ) { }

  async execute({
    bidId,
    ownerId,
    content
  }: CreateBidNoteRequest): Promise<CreateBidNoteResponse> {
    const bidNoteToCreate = BidNote.create({
      bidId,
      content,
      ownerId
    })

    const createdBidNote = await this.bidRepository.createNote(bidNoteToCreate)

    return right(createdBidNote)
  }
}