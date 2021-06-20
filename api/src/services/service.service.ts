import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from 'src/dtos/_index';
import { Service } from 'src/entities/_index';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly services: Repository<Service>,
  ) {}

  findAll({ limit, offset, q }: { limit: number; offset: number; q?: string }) {
    return this.services
      .findAndCount({
        relations: ['userServices'],
        skip: offset,
        take: limit,
        ...(q && { where: { title: Like(`%${q}%`) } }),
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
