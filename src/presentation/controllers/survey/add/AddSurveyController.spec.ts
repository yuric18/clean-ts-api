import { Validation, HttpRequest } from './AddSurveyControllerProtocols';
import { AddSurveyController } from './AddSurveyController';

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
});