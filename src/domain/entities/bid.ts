import { Entity } from "../../core/entities/entity";

interface BidProps {
  pncpId: string
}

export class Bid extends Entity<BidProps> {
  static create(props: BidProps) {
    return new Bid(props)
  }
}