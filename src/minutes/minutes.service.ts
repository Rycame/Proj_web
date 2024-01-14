import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateDescription } from 'typeorm';
import { Minute } from './minute.entity';
import { MinuteInput } from './minute.input';
import { MinuteUpdate } from './minute.update';

@Injectable()
export class MinutesService {
  constructor(
    @InjectRepository(Minute)
    private minutesRepository: Repository<Minute>,
  ) {}

  async create(minuteInput: MinuteInput): Promise<Minute> {
    const minute = this.minutesRepository.create(minuteInput);
    await this.minutesRepository.save(minute);
    return minute;
  }

  async getAll(): Promise<Minute[]> {
    return this.minutesRepository.find();
  }

  async getById(id: number): Promise<Minute> {
    const minute = await this.minutesRepository.findOne({where: {id: id}});
    if (!minute) {
      throw new NotFoundException(`Minute with ID "${id}" not found`);
    }
    return minute;
  }

  async update(id: number, minuteUpdate: MinuteUpdate): Promise<Minute> {
    const minute = await this.getById(id);
    Object.assign(minute, minuteUpdate);
    await this.minutesRepository.save(minute);
    return minute;
  }

  async remove(id: number): Promise<void> {
    const result = await this.minutesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Minute with ID "${id}" not found`);
    }
  }
}
