import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userZodValidationSchema from './users.validationZod';
import { pick } from 'lodash';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodValidationData = userZodValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodValidationData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User can not created.',
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    const requiredKeys = ['username', 'fullName', 'age', 'email', 'address'];

    const filteredResult = result.map((user) =>
      pick(user.toObject(), requiredKeys),
    );

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: filteredResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Any user can not found.',
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Any user can not found.',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
};
