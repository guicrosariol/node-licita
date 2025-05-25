import type { BidRepository } from "../../../domain/application/repositories/bid-repository"
import type { Bid } from "../../../domain/entities/bid"
import type { BidNote } from "../../../domain/entities/bid-note"


export class InMemoryBidRepository implements BidRepository {
  private items: Bid[] = []

  async create(bid: Bid): Promise<Bid> {
    this.items.push(bid)
    return bid
  };

  async findByPncpAndCompany(pncpId: string, companyId: string): Promise<null | Bid> {
    const bid = this.items.find((bid) => bid.props.pncpId == pncpId && bid.props.companyId == companyId)

    if (!bid) {
      return null
    }

    return bid
  };

  async findById(bidId: string): Promise<null | Bid> {
    const bid = this.items.find((bid) => bid.props.id == bidId)

    if (!bid) {
      return null
    }

    return bid
  };

  async markAsManaged(bidId: string): Promise<void> {
    const bid = this.items.find((bid) => bid.props.id == bidId)

    if (bid) {
      bid.markAsManaged()
    }
  };

  async checkIfManaged(bidId: string): Promise<boolean> {
    return this.items.some(
      (bid) => bid.props.id === bidId && bid.props.isManaged === true
    );
  }

  createNote(bidNote: BidNote): Promise<BidNote> {
    throw new Error("Method not implemented.");
  };
}