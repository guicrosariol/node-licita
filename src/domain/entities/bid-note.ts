import { Entity } from "../../core/entities/entity";

export interface BidNoteProps {
  bidId: string
  companyId: string
  content: string
}

export class BidNote extends Entity<BidNoteProps> {
  static create(props: BidNoteProps, id?: string) {
    return new BidNote(props, id)
  }
}