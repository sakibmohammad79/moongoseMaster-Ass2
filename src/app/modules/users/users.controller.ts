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
      message: 'User can not created.',
      error: {
        statusCode: 404,
        error: error.message,
      },
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
      error: {
        statusCode: 404,
        dedescription: 'Any user can not found.',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        statusCode: 404,
        dedescription: error.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(Number(userId));
    if (result.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;
    const updatedData = await UserServices.updateUserFromDB(
      Number(userId),
      userData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const updateUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { order: newProduct } = req.body;

    const updateOrders = await UserServices.updateUserOrdesFromDB(
      Number(userId),
      newProduct,
    );
    if (updateOrders) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getAllUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const allOrders = await UserServices.getAllOrdersFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: allOrders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserOrders,
  getAllUserOrders,
  getTotalPrice,
};
