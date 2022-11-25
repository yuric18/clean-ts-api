import {
  makeDbAddSurveyFactory,
  makeLogControllerDecorator,
} from '@/main/factories';
import { AddSurveyController, Controller } from '@/presentation';
import { makeAddSurveyValidation } from './AddSurveyValidationFactory';

export const makeAddSurveyController =
  (): Controller<AddSurveyController.Input> => {
    const addSurveyController = new AddSurveyController(
      makeAddSurveyValidation(),
      makeDbAddSurveyFactory()
    );
    return makeLogControllerDecorator(addSurveyController);
  };
