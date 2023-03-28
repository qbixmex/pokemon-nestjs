import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, now } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon extends Document {

  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  no: number;

  @Prop({ default: now() })
  createdAt?: number;
  
  @Prop({ default: now() })
  updatedAt?: number;

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
