import { makeAddSurveyValidation } from './AddSurveyValidationFactory';
import {
  ValidationComposite,
  RequiredFieldValidation,
} from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols/Validation';

jest.mock('../../../../validation/validators/ValidationComposite');

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [
      ...['answers', 'question']
        .map(f => new RequiredFieldValidation(f)),
    ];

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});