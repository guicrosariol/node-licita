import type { CompanyProps } from "../entities/company";
import type { FindByEmailAndCnpjParams } from './types/company'

export interface CompanyRepository {
  create(companyProps: CompanyProps): Promise<Company>;
  findByEmailAndCnpj(params: FindByEmailAndCnpjParams): Promise<Company | null>;
}