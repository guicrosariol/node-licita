import { UUID } from "../../core/uuid";

export interface CompanyProps {
  name: string;
  cnpj: string;
  email: string;
}

export class Company {
  private id: string;
  private name: string;
  private cnpj: string;
  private email: string;

  private constructor(props: CompanyProps) {
    this.id = UUID.create();
    this.name = props.name;
    this.cnpj = props.cnpj;
    this.email = props.email;
  };

  static create(props: CompanyProps) {
    return new Company(props);
  };
}

