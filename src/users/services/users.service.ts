import { Injectable, NotFoundException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entety';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
  ) {}

  async findAll() {
    //solo ej
    // const apiKey = this.configService.get('API_KEY');
    // const dbName = this.configService.get('DATABASE_NAME');
    // console.log(apiKey, dbName);
    const users = await this.userModel.find();
    return users;
  }
  findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  async create(data: CreateUserDto) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    const newUser = new this.userModel(data);
    const model = newUser.save();
    // const { password, ...rta } = (await model).toJSON();
    // return rta;  SOLO SIRVIO AL CREAR COMO EJ DE LA CLASE,
    return model;
  }
  // create(payload: CreateUserDto) {
  //   const newUser = {
  //     ...payload,
  //   };
  //   this.userModel.create(newUser);
  //   return newUser;
  // }
  async findByEmail(email: string) {
    const emailUser = await this.userModel.findOne({ email });
    return emailUser;
  }

  delete(id: string) {
    const index = this.userModel.findByIdAndDelete(id).exec();
    if (!index) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return { message: `User ${id} has been deleted ` };
  }
  update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  // update(id: number, payload: UpdateUserDto) {
  //   const user = this.userModel.findByIdAndUpdate(id, payload);
  //   return user;
  //   // this.userModel[index] = {
  //   //   ...find,
  //   //   ...payload,
  //   // };
  // }
  async getOrderByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
