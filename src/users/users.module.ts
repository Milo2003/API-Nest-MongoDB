import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';
import { User, UserSchema } from './entities/user.entety';
import { Order, OrderSSchema } from './entities/order.entety';
import { Customer, CustomerSchema } from './entities/customer.entety';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProfileController } from './controllers/profile.controller';
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: User.name, schema: UserSchema },
      { name: Order.name, schema: OrderSSchema },
    ]),
  ],
  controllers: [CustomersController, UsersController, OrdersController, ProfileController],
  providers: [CustomersService, UsersService, OrdersService],
  exports: [UsersModule, UsersService],
})
export class UsersModule {}
