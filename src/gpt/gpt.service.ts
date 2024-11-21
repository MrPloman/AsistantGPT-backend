import { Injectable } from '@nestjs/common';
import {
  ortographyCheckUseCase,
  prosConsDiscusserUseCase,
} from './use-cases/index';
import { OrtographyDTO } from './dtos/ortography.dto';
import OpenAI from 'openai';
import { ProsConsDiscusserDTO } from './dtos';

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

  public async prosConsDiscusser({ prompt }: ProsConsDiscusserDTO) {
    return await prosConsDiscusserUseCase(this.openAiConfig, { prompt });
  }
}
