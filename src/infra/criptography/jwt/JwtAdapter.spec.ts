import jwt from 'jsonwebtoken';
import {JwtAdapter} from "./JwtAdapter";

jest.mock('jsonwebtoken', () => ({
  sign(): Promise<string> {
    return Promise.resolve('any_token');
  }
}))

type SutTypes = {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret');
  return {
    sut
  }
};

describe('JWT Adapter', () => {
  test('Should call sign with correct values', async () => {
    const { sut } = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });

  test('Should return a token on sign success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.encrypt('any_id');
    expect(accessToken).toBe('any_token');
  });
});
