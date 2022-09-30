import { Controller } from '@/presentation/protocols';
import { AddSurveyController } from '@/presentation/controllers/survey/add/AddSurveyController';
import { makeAddSurveyValidation } from './AddSurveyValidationFactory';
import { makeLogControllerDecorator } from '../../decorators/LogControllerDecoratorFactory';
import { makeDbAddSurveyFactory } from '../../usecases/addSurvey/AddSurveyFactory';

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurveyFactory());
  return makeLogControllerDecorator(addSurveyController);
};
