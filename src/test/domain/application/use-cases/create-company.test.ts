import { beforeEach, describe, expect, it } from 'vitest'
import { makeCreateCompanyUseCase } from '../factories/make-create-company'
import { Company } from '../../../../domain/entities/company'
import { AlreadyExistError } from '../../../../domain/application/use-cases/errors/already-exist-error'

let sut: ReturnType<typeof makeCreateCompanyUseCase>

describe('Create company use case', () => {
  beforeEach(() => {
    sut = makeCreateCompanyUseCase()
  })

  it('should be able to create a new company', async () => {
    const result = await sut.execute({
      ownerId: '1',
      name: 'example',
      cnpj: 'example',
      email: 'example',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Company)
  })

  it('should not be able to create a company with same cnpj or email', async () => {

    await sut.execute({
      ownerId: '1',
      name: 'Company A',
      cnpj: '123456789',
      email: 'company@example.com',
    })

    const resultWithSameCnpj = await sut.execute({
      ownerId: '1',
      name: 'Company B',
      cnpj: '123456789',
      email: 'unique@example.com',
    })

    const resultWithSameEmail = await sut.execute({
      ownerId: '1',
      name: 'Company C',
      cnpj: '987654321',
      email: 'company@example.com',
    })

    expect(resultWithSameCnpj.isLeft()).toBe(true)
    expect(resultWithSameCnpj.value).toBeInstanceOf(AlreadyExistError)

    expect(resultWithSameEmail.isLeft()).toBe(true)
    expect(resultWithSameEmail.value).toBeInstanceOf(AlreadyExistError)
  })
})