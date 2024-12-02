import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import {
  OrtographyDTO,
  ProsConsDiscusserDTO,
  TranslateDTO,
} from './dtos/index';
import { Response } from 'express';

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

  @Post('pros-cons-discusser-stream')
  protected async prosConsDiscusserStream(
    @Body() prosConsDTO: ProsConsDiscusserDTO,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(prosConsDTO);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const pieceOfStream = chunk.choices[0].delta.content || '';
      res.write(pieceOfStream);
    }
    res.end();
  }

  @Post('translate')
  protected async translate(
    @Body() translateDTO: TranslateDTO,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.translate(translateDTO);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const pieceOfStream = chunk.choices[0].delta.content || '';
      res.write(pieceOfStream);
    }
    res.end();
  }
}
