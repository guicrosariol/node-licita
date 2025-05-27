import { Bid, type BidProps } from "../../domain/entities/bid";

export function makeBid(override: Partial<BidProps> = {}, id?: string) {
  return Bid.create({
    pncpId: '1',
    companyId: '1',
    isManaged: false,
    ...override,
  }, id)
}


