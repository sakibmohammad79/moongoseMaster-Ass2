import { TUser } from './users.interface';
import { User } from './users.shema.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }

  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
