import MockDate from 'mockdate';

import {
  AddSurveyController,
  Validation,
  AddSurvey,
  badRequest,
  noContent,
  serverError,
} from '@/index';

import { mockValidation } from 'test/validation';
import { mockAddSurvey } from 'test/domain';

const mockInput = (): AddSurveyController.Input => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

type SutTypes = {
  sut: AddSurveyController;
  validationStub: Validation;
  addSurveyStub: AddSurvey;
};

const makeSut = (): SutTypes => {
  const addSurveyStub = mockAddSurvey();
  const validationStub = mockValidation();
  const sut = new AddSurveyController(validationStub, addSurveyStub);
  return {
    sut,
    validationStub,
    addSurveyStub,
  };
};

describe('Add Survey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(mockInput());
    expect(validateSpy).toHaveBeenCalledWith(mockInput());
  });

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => new Error());
    const httpResponse = await sut.handle(mockInput());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    await sut.handle(mockInput());
    expect(addSpy).toHaveBeenCalledWith({ ...mockInput(), date: new Date() });
  });

  test('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut();
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(mockInput());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockInput());
    expect(httpResponse).toEqual(noContent());
  });
});
