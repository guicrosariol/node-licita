import { Entity } from "../../core/entities/entity";

export interface UserProps {
  id?: string
  name: string
  email: string
  passwordHash: string
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: string,) {
    return new User(props, id)
  };
}
