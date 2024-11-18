import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases/index';
import { OrtographyDTO } from './dtos/ortography.dto';

@Injectable()
export class GptService {
  public async ortographyCheck(ortographyDto: OrtographyDTO) {
    return await ortographyCheckUseCase({ prompt: ortographyDto.prompt });
  }
}
