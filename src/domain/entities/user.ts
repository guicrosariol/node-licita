export interface UserProps {
  name: string;
  cnpj: string;
  email: string;
  passwordHash: string;
}

export class User {
  private name: string;
  private cnpj: string;
  private email: string;
  private passwordHash: string;

  private constructor(props: UserProps) {
    this.name = props.name;
    this.cnpj = props.cnpj;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
  };

  static create(props: UserProps) {
    return new User(props)
  };
}