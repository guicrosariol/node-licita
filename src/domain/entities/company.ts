import { Entity } from "../../core/entities/entity";

export interface CompanyProps {
  name: string;
  cnpj: string;
  email: string;
}

export class Company extends Entity<CompanyProps> {
  static create(id: string, props: CompanyProps) {
    return new Company(props, id);
  };
}

