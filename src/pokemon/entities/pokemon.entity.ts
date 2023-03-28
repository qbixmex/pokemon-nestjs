import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, now } from 'mongoose';

// export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema({ timestamps: true })
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
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
  
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
