import { makeAddSurveyValidation } from '@/main/factories/controllers/AddSurveyValidationFactory';

import {
  Validation,
  ValidationComposite,
  RequiredFieldValidation,
} from '@/index';

jest.mock('@/validation/validators/ValidationComposite');

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [
      ...['answers', 'question'].map((f) => new RequiredFieldValidation(f)),
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
