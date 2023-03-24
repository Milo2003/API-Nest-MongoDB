import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('isPublic', true)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('new')
  @SetMetadata('isPublic', true)
  newEndpoint() {
    return 'newEndpoint';
  }
  @Get('public')
  @Public() //Decorador que creamos para que envie un true al guardian y nos de acceso
  publicEndpoint() {
    return 'This endpoint is public';
  }
  @Get('/hello/')
  hello() {
    return ' con /sas/';
  }
  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
