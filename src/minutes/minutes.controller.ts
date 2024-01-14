import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MinutesService } from './minutes.service';
import { MinuteInput } from './minute.input';
import { MinuteUpdate } from './minute.update';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('minutes')
@Controller('minutes')
export class MinutesController {
  constructor(private readonly minutesService: MinutesService) {}

  @Post()
  async create(@Body() minuteInput: MinuteInput) {
    return this.minutesService.create(minuteInput);
  }

  @Get()
  async findAll() {
    return this.minutesService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.minutesService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() minuteUpdate: MinuteUpdate) {
    return this.minutesService.update(id, minuteUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.minutesService.remove(id);
  }
}
