import type { Bid } from "../../entities/bid";
import type { BidNote, BidNoteProps } from "../../entities/bid-note";

export interface BidRepository {
  create(bid: Bid): Promise<Bid>
  findByPncpAndCompany(pncpId: string, companyId: string): Promise<null | Bid>
  findById(bidId: string): Promise<null | Bid>
  markAsManaged(bidId: string): Promise<void>
  checkIfManaged(bidId: string): Promise<boolean>
  createNote(bidNote: BidNote): Promise<BidNote>
}