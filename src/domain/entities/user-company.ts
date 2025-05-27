import { Entity } from "../../core/entities/entity";

interface UserCompanyProps {
  userId: string,
  companyId: string
}

export class UserCompany extends Entity<UserCompanyProps> {
  static create(props: UserCompanyProps, id?: string) {
    return new UserCompany(props, id)
  }
}