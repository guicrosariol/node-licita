import type { BidRepository } from "../../../domain/application/repositories/bid-repository"
import type { Bid } from "../../../domain/entities/bid"
import type { BidNote } from "../../../domain/entities/bid-note"


export class InMemoryBidRepository implements BidRepository {
  private bids: Bid[] = []
  private bidNotes: BidNote[] = []


  async create(bid: Bid): Promise<Bid> {
    this.bids.push(bid)

    return bid
  };

  async findByPncpAndCompany(pncpId: string, companyId: string): Promise<null | Bid> {
    const bid = this.bids.find((bid) => bid.props.pncpId == pncpId && bid.props.companyId == companyId)

    if (!bid) {
      return null
    }

    return bid
  };

  async findById(bidId: string): Promise<Bid | null> {
    const bid = this.bids.find((bid) => bid.id.toValue() === bidId)

    return bid ?? null
  }

  async markAsManaged(bidId: string): Promise<void> {
    const bid = this.bids.find((bid) => bid.props.id == bidId)

    if (bid) {
      bid.markAsManaged()
    }
  };

  async checkIfManaged(bidId: string): Promise<boolean> {
    return this.bids.some(
      (bid) => bid.props.id === bidId && bid.props.isManaged === true
    );
  }

  async createNote(bidNote: BidNote): Promise<BidNote> {
    this.bidNotes.push(bidNote)
    return bidNote
  };
}