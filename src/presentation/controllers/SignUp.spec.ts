import { HttpResponse } from "../protocols/IHttp";
import { MissingParamError } from "../errors/MissingParamError";
import { SignUpController } from "./SignUp";

const makeSut = (): SignUpController => {
  return new SignUpController();
}

describe('/src/presentation/controllers/SignUp', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no email is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: "any_password",
        passwordConfirmation: "any_password"
      }
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: "any_password"
      }
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no password confirmation is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: "any_password"
      }
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });
});
