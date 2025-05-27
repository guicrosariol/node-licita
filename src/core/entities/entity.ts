import { UniqueEntityID } from "./unique-entity-id"

export class Entity<Props> {
  readonly id: UniqueEntityID
  readonly props: Props

  constructor(
    props: Props,
    id?: string,
  ) {
    this.props = props
    this.id = new UniqueEntityID(id)
  }
}