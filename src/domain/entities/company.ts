import { Entity } from "../../core/entities/entity";

export interface CompanyProps {
  id?: string;
  name: string;
  ownerId: string;
  maximumUsers: number;
  currentUsers: number;
  cnpj: string;
  email: string;
}

export class Company extends Entity<CompanyProps> {
  get canAddUser(): boolean {
    return (this.props.currentUsers ?? 0) < (this.props.maximumUsers ?? 1);
  }

  static create(props: CompanyProps, id?: string,) {
    return new Company(props, id);
  };
}

