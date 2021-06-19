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

  findAll() {
    // const { limit, offset } = paginationQuery;
    return this.services.find({
      relations: ['promoCodes'],
    });
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
