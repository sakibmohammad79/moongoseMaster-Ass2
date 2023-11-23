import { User } from './users.interface';
import UserModel from './users.shema.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
