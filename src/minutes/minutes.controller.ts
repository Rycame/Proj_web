import { Controller, Get, Post, Body } from '@nestjs/common';
import { MinutesService } from './minutes.service';
import { Minute } from './minute.entity';
import { MinuteInput } from './minutes.input';

@Controller('minutes')
export class MinutesController {
  constructor(private readonly minutesService: MinutesService) {}

  @Get()
  findAll(): Promise<Minute[]> {
    return this.minutesService.findAll();
  }

  @Post()
  create(@Body() minuteInput: MinuteInput): Promise<Minute> {
    return this.minutesService.create(minuteInput);
  }
}
