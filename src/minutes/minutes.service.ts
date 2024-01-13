import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Minute } from './minute.entity';
import { MinuteInput } from './minutes.input';

@Injectable()
export class MinutesService {
  constructor(
    @InjectRepository(Minute)
    private readonly minuteRepository: Repository<Minute>,
  ) {}

  findAll(): Promise<Minute[]> {
    return this.minuteRepository.find();
  }

  create(minuteInput: MinuteInput): Promise<Minute> {
    const minute = this.minuteRepository.create(minuteInput);
    return this.minuteRepository.save(minute);
  }
}
