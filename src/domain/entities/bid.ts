import { Entity } from "../../core/entities/entity";

export interface BidProps {
  companyId: string,
  pncpId: string
  isManaged?: boolean
}

export class Bid extends Entity<BidProps> {
  markAsManaged() {
    this.props.isManaged = true;
  }

  static create(props: BidProps, id?: string) {
    return new Bid({
      ...props, isManaged: props.isManaged ?? false
    }, id)
  }
}