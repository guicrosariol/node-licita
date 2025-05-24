import type { Company } from "../../entities/company";
import type { CompanyProps } from "../entities/company";
import type { FindByEmailAndCnpjParams } from './types/company'

export interface CompanyRepository {
  create(company: Company): Promise<Company>;
  findByEmailOrCnpj(params: FindByEmailAndCnpjParams): Promise<Company | null>;
}