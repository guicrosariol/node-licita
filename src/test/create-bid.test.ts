import { beforeEach, describe, expect, it } from 'vitest'
import { makeCreateBidUseCase } from './factories/make-create-bid'
import { Bid } from '../domain/entities/bid'
import { AlreadyExistError } from '../domain/application/use-cases/errors/already-exist-error'
import { makeCreateCompanyUseCase } from './factories/make-create-company'
import { InMemoryCompanyRepository } from './repositories/in-memory-company-repository'

let sut: ReturnType<typeof makeCreateBidUseCase>
let createCompanyUseCase: ReturnType<typeof makeCreateCompanyUseCase>
let sharedCompanyRepository: InMemoryCompanyRepository

describe('Create bid use case', () => {
  beforeEach(() => {
    sharedCompanyRepository = new InMemoryCompanyRepository()

    sut = makeCreateBidUseCase(sharedCompanyRepository)
    createCompanyUseCase = makeCreateCompanyUseCase(sharedCompanyRepository)
  })

  it('should be able to create a new bid', async () => {
    await createCompanyUseCase.execute({
      id: '1',
      name: 'example',
      cnpj: '1',
      email: 'example@example.com'
    })

    const result = await sut.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Bid)
  })

  it('should not be able to create a bid with same pncpId and companyId', async () => {
    await createCompanyUseCase.execute({
      id: '1',
      name: 'example',
      cnpj: '1',
      email: 'example@example.com'
    })

    await sut.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    const result = await sut.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistError)
  })
})