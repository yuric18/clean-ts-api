import { Validation, HttpRequest } from './AddSurveyControllerProtocols';
import { AddSurveyController } from './AddSurveyController';
import { badRequest } from '../../../helpers/http/HttpHelper';

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }],
  },
});

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const sut = new AddSurveyController(validationStub);
  return {
    sut,
    validationStub,
  };
};


describe('Add Survey Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(makeFakeHttpRequest());
    expect(validateSpy).toHaveBeenCalledWith(makeFakeHttpRequest().body);
  });

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => new Error() );
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });
});