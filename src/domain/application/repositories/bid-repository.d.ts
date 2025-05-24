import type { Bid } from "../../entities/bid";
import type { BidNote, BidNoteProps } from "../../entities/bid-note";

export interface BidRepository {
  create(bid: Bid): Promise<Bid>
  findByPncpId(pncpId: string): Promise<null | Bid>
  createNote(bidNote: BidNote): Promise<BidNote>
}