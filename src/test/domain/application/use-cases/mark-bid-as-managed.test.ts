import { beforeEach, describe, expect, it } from 'vitest'
import { makeMarkBidAsManaged } from '../factories/make-mark-bid-as-managed'
import { makeCreateBidUseCase } from '../factories/make-create-bid'
import { InMemoryBidRepository } from '../repositories/in-memory-bid-repository'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'
import { makeCreateCompanyUseCase } from '../factories/make-create-company'
import { ForbiddenError } from '../../../../domain/application/use-cases/errors/forbidden-error'
import { ActionAlreadyPerformedError } from '../../../../domain/application/use-cases/errors/action-already-performed-error'

let sut: ReturnType<typeof makeMarkBidAsManaged>
let sharedBidRepository: InMemoryBidRepository
let sharedCompanyRepository: InMemoryCompanyRepository
let createBidUseCase: ReturnType<typeof makeCreateBidUseCase>
let createCompanyUseCase: ReturnType<typeof makeCreateCompanyUseCase>

describe('Mark bid as managed use case', () => {
  beforeEach(() => {
    sharedBidRepository = new InMemoryBidRepository()
    sharedCompanyRepository = new InMemoryCompanyRepository()

    createCompanyUseCase = makeCreateCompanyUseCase({
      sharedCompanyRepository
    })

    sut = makeMarkBidAsManaged({
      sharedBidRepository,
      sharedCompanyRepository
    })
    createBidUseCase = makeCreateBidUseCase({
      sharedBidRepository,
      sharedCompanyRepository
    })

  })

  it('should be able to mark bid as managed', async () => {
    await createCompanyUseCase.execute({
      id: '1',
      cnpj: '1',
      email: 'example@example.com',
      name: 'example'
    })

    await createBidUseCase.execute({
      id: '1',
      companyId: '1',
      pncpId: '1'
    })

    const result = await sut.execute({
      bidId: '1',
      companyId: '1'
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not allow marking bid as managed if company does not own the bid', async () => {
    await createCompanyUseCase.execute({
      id: 'company-1',
      cnpj: '1',
      email: 'example1@example.com',
      name: 'Company One'
    })

    await createCompanyUseCase.execute({
      id: 'company-2',
      cnpj: '2',
      email: 'example2@example.com',
      name: 'Company Two'
    })

    await createBidUseCase.execute({
      id: 'bid-1',
      companyId: 'company-1',
      pncpId: 'pncp-1'
    })

    const result = await sut.execute({
      bidId: 'bid-1',
      companyId: 'company-2'
    })

    expect(result.isLeft()).toBe(true)
  })

  it('should not allow marking bid as managed if it is already marked', async () => {
    await createCompanyUseCase.execute({
      id: 'company-1',
      cnpj: '2',
      email: 'example2@example.com',
      name: 'Company Two'
    })

    await createBidUseCase.execute({
      id: 'bid-1',
      companyId: 'company-1',
      pncpId: 'pncp-1'
    })

    await sut.execute({
      bidId: 'bid-1',
      companyId: 'company-1'
    })

    const result = await sut.execute({
      bidId: 'bid-1',
      companyId: 'company-1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ActionAlreadyPerformedError)
  })
})