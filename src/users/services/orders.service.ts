import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dtos';
import { Order } from '../entities/order.entety';
import { User } from '../entities/user.entety';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.orderModel.find().populate('customer').populate('products');
  }
  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`orders del ${id} not found`);
    }
    return order;
  }
  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }
  async delete(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return { message: `La Orden ${id} se elimino correctamente` };
  }
  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }
  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`No se pudo encontrar la orden con id ${id}`);
    }
    productsIds.forEach((pId) => order.products.addToSet(pId));
    return order.save();
  }
  async ordersByCustomer(userId: string) {
    const user = await this.userModel.findById(userId);
    const customerId = user.customer;
    return this.orderModel.find({ customer: customerId }).populate('products');
  }
}
