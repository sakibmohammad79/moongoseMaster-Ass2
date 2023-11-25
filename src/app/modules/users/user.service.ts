import { TUser } from './users.interface';
import { User } from './users.shema.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  const createUser = await User.findOne({ _id: result._id })
    .select('-password')
    .select('-orders');

  return createUser;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select('-password');
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId })
    .select('-password')
    .select('-orders');
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

const updateUserFromDB = async (userId: number, userData: any) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const options = { new: true };

  const updatedUser = await User.findOneAndUpdate(
    { userId: userId },
    { $set: userData },
    options,
  )
    .select('-password')
    .select('-orders');
  return updatedUser;
};

const updateUserOrdesFromDB = async (userId: number, newProduct: any) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const updateUserOrders = await User.updateOne(
    { userId },
    { $push: { orders: newProduct } },
  );
  if (!updateUserOrders) {
    throw new Error('User not found');
  }
  return updateUserOrders;
};

const getAllOrdersFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.find(
    {
      userId: userId,
    },
    { _id: 0, orders: 1 },
  );
  return result.length > 0 ? result[0].orders : [];
};

const getTotalPriceFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found!');
  }
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    { $project: { totalPrice: 1, _id: 0 } },
  ]);
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  updateUserOrdesFromDB,
  getAllOrdersFromDB,
  getTotalPriceFromDB,
};
