import type { BidRepository } from "../../../domain/application/repositories/bid-repository";
import type { Bid } from "../../../domain/entities/bid";
import type { BidNote } from "../../../domain/entities/bid-note";

export class PrismaBidRepository implements BidRepository {
  create(bid: Bid): Promise<Bid> {
    throw new Error("Method not implemented.");
  }
  findByPncpAndCompany(pncpId: string, companyId: string): Promise<null | Bid> {
    throw new Error("Method not implemented.");
  }
  findById(bidId: string): Promise<null | Bid> {
    throw new Error("Method not implemented.");
  }
  markAsManaged(bidId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  checkIfManaged(bidId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  createNote(bidNote: BidNote): Promise<BidNote> {
    throw new Error("Method not implemented.");
  }
}