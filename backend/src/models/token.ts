import { Schema, model, Types } from 'mongoose';

interface IToken {
  userId: Types.ObjectId;
  refreshToken: string;
}

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const Token = model<IToken>('Token', tokenSchema);

export default Token;
