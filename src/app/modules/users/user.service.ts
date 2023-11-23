import { TUser } from './users.interface';
import User from './users.shema.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user already exist');
  }
  const result = await User.create(userData);

  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.deleteOne({ userId });
  return result;
};

const updateUserFromDB = async (userId: string, updateData: any) => {
  const options = { new: true };

  const updatedUser = await User.findOneAndUpdate(
    { userId: userId },
    { $set: updateData },
    options,
  );
  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
