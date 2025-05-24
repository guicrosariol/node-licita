import { Entity } from "../../core/entities/entity";

export interface CompanyProps {
  id?: string;
  name: string;
  cnpj: string;
  email: string;
}

export class Company extends Entity<CompanyProps> {
  static create(props: CompanyProps, id?: string,) {
    return new Company(props, id);
  };
}

