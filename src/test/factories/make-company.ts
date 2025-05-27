import { Company, type CompanyProps } from "../../domain/entities/company";

export function makeCompany(override: Partial<CompanyProps> = {}, id?: string) {
  return Company.create({
    name: 'example',
    email: 'example@example.com',
    cnpj: '1',
    ownerId: '1',
    currentUsers: 1,
    maximumUsers: 1,
    ...override,
  }, id)
}


