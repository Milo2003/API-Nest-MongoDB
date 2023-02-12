import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class SubDoc {
  @Prop()
  name: string;
  @Prop()
  description: string;
}

export const SubDocSchema = SchemaFactory.createForClass(SubDoc);
