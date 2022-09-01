module.exports = {
  clearMocks: true,
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
