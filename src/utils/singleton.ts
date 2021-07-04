import { PrismaClient } from '@prisma/client'
import { MockProxy, mockDeep, mockReset } from 'jest-mock-extended'

import prisma from '../database/client'

jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = (prisma as unknown) as MockProxy<PrismaClient>
