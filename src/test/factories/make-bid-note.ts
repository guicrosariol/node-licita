import { BidNote, type BidNoteProps } from "../../domain/entities/bid-note";

export function makeBidNote(override: Partial<BidNoteProps> = {}, id?: string) {
  return BidNote.create({
    ownerId: '1',
    bidId: '1',
    companyId: '1',
    content: 'example',
    ...override,
  }, id)
}


