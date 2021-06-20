import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from 'src/dtos/_index';
import { Service } from 'src/entities/_index';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly services: Repository<Service>,
  ) {}

  findAll({ limit, offset }: { limit: number; offset: number }) {
    return this.services
      .findAndCount({
        relations: ['promoCodes'],
        skip: offset,
        take: limit,
      })
      .then((result) => ({ rows: result[0], count: result[1] }));
  }

  async createService({ title, description, price }: CreateServiceDto) {
    try {
      const service = await this.services.save(
        this.services.create({
          title,
          price,
          description,
        }),
      );
      return { ok: true, data: service };
    } catch (error) {
      return { ok: false, error: "Couldn't create service" };
    }
  }
}
