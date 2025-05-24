import { beforeEach, describe, expect, it } from 'vitest'
import { makeCreateBidUseCase } from './factories/make-create-bid'
import { Bid } from '../domain/entities/bid'

let sut: ReturnType<typeof makeCreateBidUseCase>

describe('Create bid use case', () => {
  beforeEach(() => {
    sut = makeCreateBidUseCase()
  })

  it('shold be able to create a new bid', async () => {
    const result = await sut.execute({
      id: '1',
      pncpId: '1'
    })
    
    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Bid)
  })
})