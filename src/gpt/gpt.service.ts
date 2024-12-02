import { Injectable } from '@nestjs/common';
import {
  ortographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  translateUseCase,
} from './use-cases/index';
import { OrtographyDTO } from './dtos/ortography.dto';
import OpenAI from 'openai';
import { ProsConsDiscusserDTO, TranslateDTO } from './dtos';

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

  public async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDTO) {
    return await prosConsDiscusserStreamUseCase(this.openAiConfig, { prompt });
  }
  public async translate({ prompt, language }: TranslateDTO) {
    return await translateUseCase(this.openAiConfig, {
      prompt,
      language,
    });
  }
}
