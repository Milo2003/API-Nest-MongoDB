import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Customer } from './customer.entety';
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;
  @Exclude() //Aun no me sirve y por el momento esta mejor el select:false
  //El select false no funciona ya que no me funciona al hacer comparar la password con el hash
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: string;
  @Prop({ type: Types.ObjectId, ref: Customer.name })
  customer: Customer | Types.ObjectId;
}
export const UserSchema = SchemaFactory.createForClass(User);
