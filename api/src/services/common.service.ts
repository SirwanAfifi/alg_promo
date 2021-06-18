import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  doWork = () => ({
    ok: 'Do Work',
  });
}
