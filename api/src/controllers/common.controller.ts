import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommonService } from 'src/services/_index';
import { AuthGuard } from 'src/utils/auth.guard';

@Controller('api/common')
@UseGuards(AuthGuard)
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  doWork() {
    return this.commonService.doWork();
  }
}
