import { Controller, Get } from '@nestjs/common';
import { CommonService } from 'src/services/_index';

@Controller('api/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  doWork() {
    return this.commonService.doWork();
  }
}
