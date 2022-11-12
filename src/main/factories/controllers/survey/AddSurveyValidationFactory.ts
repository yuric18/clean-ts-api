import {
  ValidationComposite,
  RequiredFieldValidation,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols/Validation';

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    ...['answers', 'question'].map((f) => new RequiredFieldValidation(f)),
  ];
  return new ValidationComposite(validations);
};
