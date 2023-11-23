import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './users.interface';
import bcrypt from 'bcrypt';
import { config } from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  hobbies: [
    {
      type: String,
      required: true,
    },
  ],
  address: addressSchema,
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// creating custom static method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// creating custom static method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
