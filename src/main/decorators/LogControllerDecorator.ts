import { Controller, HttpResponse } from '@/presentation';
import { LogErrorRepository } from '@/data';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle(input): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(input);

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }

    return httpResponse;
  }
}
