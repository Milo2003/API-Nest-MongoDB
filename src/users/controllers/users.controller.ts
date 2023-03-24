import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private user: UsersService) {}

  @Get()
  get() {
    return this.user.findAll();
  }
  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.user.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.user.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.user.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.user.delete(id);
  }
}
