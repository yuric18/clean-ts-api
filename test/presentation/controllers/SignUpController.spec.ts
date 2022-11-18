import {
  SignUpController,
  AddAccount,
  Validation,
  Authentication,
  ok,
  badRequest,
  serverError,
  HttpResponse,
  MissingParamError,
  forbidden,
  ServerError,
  EmailAlreadyExists,
} from '@/index';

import {
  mockAuthentication,
  mockAddAccount,
  mockAuthenticatedAccount,
} from 'test/domain';

import { mockValidation } from 'test/validation';

type SutTypes = {
  sut: SignUpController;
  addAccountStub: AddAccount;
  validationStub: Validation;
  authenticationStub: Authentication;
};

const makeInput = (): SignUpController.Input => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
});

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub
  );
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub,
  };
};

describe('SignUp Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const input = makeInput();
    await sut.handle(input);
    expect(validateSpy).toHaveBeenCalledWith(input);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    );
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(makeInput());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const input = makeInput();
    await sut.handle(input);
    expect(addSpy).toHaveBeenCalledWith({
      name: input.name,
      email: input.email,
      password: input.password,
    });
  });

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(new Error());
    const httpResponse: HttpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test('Should returns 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockResolvedValueOnce(null);
    const httpResponse: HttpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(forbidden(new EmailAlreadyExists()));
  });

  test('Should returns 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse: HttpResponse = await sut.handle(makeInput());
    expect(httpResponse).toEqual(ok(mockAuthenticatedAccount()));
  });
});
