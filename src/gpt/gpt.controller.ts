import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrtographyDTO } from './dtos/index';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  // Receives texts and return them checked.

  @Post('ortography-check')
  protected ortographyCheck(@Body() ortographyDto: OrtographyDTO) {
    return ortographyDto;
    return this.gptService.ortographyCheck();
  }
}
