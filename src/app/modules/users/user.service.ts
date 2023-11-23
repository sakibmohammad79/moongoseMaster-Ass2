import { TUser } from './users.interface';
import User from './users.shema.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('user already exist');
  }
  const result = await User.create(userData);
  const createUser = await User.findOne({ _id: result._id }).select(
    '-password',
  );

  return createUser;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select('-password');
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select('-password');
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
  ).select('-password');
  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
