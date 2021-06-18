import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceService {
  doWork = () => 'Do Work';
}
