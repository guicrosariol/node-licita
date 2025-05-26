import type { Company } from "../../entities/company";
import type { CompanyProps } from "../entities/company";
import type { FindByEmailAndCnpjParams } from './types/company'

export interface CompanyRepository {
  create(company: Company): Promise<Company>;
  findById(companyId: string): Promise<null | Company>
  findByEmailOrCnpj(email: string, cnpj:string): Promise<Company | null>;
}