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
    if (result) {
      const requiredKeys = ['username', 'fullName', 'age', 'email', 'address'];
      const filteredResult = pick(result.toObject(), requiredKeys);

      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: filteredResult,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found.',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error.',
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    if (result.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;
    const updatedData = await UserServices.updateUserFromDB(userId, userData);

    if (updatedData) {
      const requiredKeys = ['username', 'fullName', 'age', 'email', 'address'];
      const filteredResult = pick(updatedData.toObject(), requiredKeys);
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: filteredResult,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error!',
      },
    });
  }
};

const updateUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { order: newProduct } = req.body;

    const updateOrders = await UserServices.updateUserOrdesFromDB(
      userId,
      newProduct,
    );
    if (updateOrders) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error!',
      },
    });
  }
};

const getAllUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const allOrders = await UserServices.getAllOrdersFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: allOrders,
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

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found.',
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
  updateUser,
  deleteUser,
  updateUserOrders,
  getAllUserOrders,
  getTotalPrice,
};
