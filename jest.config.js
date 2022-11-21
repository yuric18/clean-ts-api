module.exports = {
  clearMocks: true,
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/test'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    'test/(.*)': '<rootDir>/test/$1',
  },
};
