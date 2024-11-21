import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrtographyDTO, ProsConsDiscusserDTO } from './dtos/index';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  // Receives texts and return them checked.
  @Post('ortography-check')
  protected ortographyCheck(@Body() ortographyDto: OrtographyDTO) {
    return this.gptService.ortographyCheck(ortographyDto);
  }

  @Post('pros-cons-discusser')
  protected prosConsDiscusser(@Body() prosConsDTO: ProsConsDiscusserDTO) {
    return this.gptService.prosConsDiscusser(prosConsDTO);
  }
}
