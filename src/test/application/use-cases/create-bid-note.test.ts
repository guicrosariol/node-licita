import { beforeEach, describe, expect, it } from 'vitest'
import { MakeCreateBidNoteUseCase } from '../factories/make-create-bid-note'
import { BidNote } from '../../../domain/entities/bid-note'
import { makeCreateBidUseCase } from '../factories/make-create-bid'
import { makeCreateCompanyUseCase } from '../factories/make-create-company'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'
import { InMemoryBidRepository } from '../repositories/in-memory-bid-repository'
import { NotFoundError } from '../../../domain/application/use-cases/errors/not-found-error'

let sut: ReturnType<typeof MakeCreateBidNoteUseCase>
let createBidUseCase: ReturnType<typeof makeCreateBidUseCase>
let createCompanyUseCase: ReturnType<typeof makeCreateCompanyUseCase>
let sharedCompanyRepository: InMemoryCompanyRepository
let sharedBidRepository: InMemoryBidRepository

describe('Create bid use case', () => {
  beforeEach(() => {
    sharedCompanyRepository = new InMemoryCompanyRepository()
    sharedBidRepository = new InMemoryBidRepository()

    sut = MakeCreateBidNoteUseCase({
      sharedBidRepository,
      sharedCompanyRepository
    })
    createBidUseCase = makeCreateBidUseCase({
      sharedBidRepository,
      sharedCompanyRepository
    })
    createCompanyUseCase = makeCreateCompanyUseCase({
      sharedCompanyRepository
    })
  })

  it('should be able to create a new bid note', async () => {
    await createCompanyUseCase.execute({
      id: '1',
      name: 'example',
      email: 'example@example.com',
      cnpj: '1'
    })

    await createBidUseCase.execute({
      id: '1',
      pncpId: '1',
      companyId: '1'
    })

    const result = await sut.execute({
      bidId: '1',
      companyId: '1',
      content: 'example'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(BidNote)
  })

  it('should not be able to create a bid note with a company that doesn’t exist', async () => {
    await createBidUseCase.execute({
      id: '1',
      pncpId: '1',
      companyId: '1'
    })

    const result = await sut.execute({
      bidId: '1',
      companyId: '1',
      content: 'example'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('should not be able to create a bid note with a bid that doesn’t exist', async () => {
    await createCompanyUseCase.execute({
      id: '1',
      cnpj: '1',
      email: 'example@example.com',
      name: 'example',
    })

    const result = await sut.execute({
      bidId: '1',
      companyId: '1',
      content: 'example'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})