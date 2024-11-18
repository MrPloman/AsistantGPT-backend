import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases/index';
import { OrtographyDTO } from './dtos/ortography.dto';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openAiConfig = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  public async ortographyCheck(ortographyDto: OrtographyDTO) {
    return await ortographyCheckUseCase(this.openAiConfig, {
      prompt: ortographyDto.prompt,
    });
  }
}
