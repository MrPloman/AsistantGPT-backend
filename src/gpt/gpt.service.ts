import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases/index';

@Injectable()
export class GptService {
  public async ortographyCheck() {
    return await ortographyCheckUseCase();
  }
}
