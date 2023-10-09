import { jest } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

export function createMockPrisma(mock: unknown) {
  return mock as unknown as jest.Mocked<PrismaClient>;
}
