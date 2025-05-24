import type { BidNote, BidNoteProps } from "../../entities/bid-note";

export interface BidRepository {
  createNote(bidNote: BidNote): Promise<BidNote>
}