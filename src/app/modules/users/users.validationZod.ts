import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().min(1, { message: 'First name cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
});

const addressSchema = z.object({
  street: z.string().min(1, { message: 'Street name cannot be empty' }),
  city: z.string().min(1, { message: 'City name cannot be empty' }),
  country: z.string().min(1, { message: 'Country name cannot be empty' }),
});

const orderSchema = z.object({
  productName: z.string().min(1, { message: 'Product name cannot be empty' }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

const userZodValidationSchema = z.object({
  userId: z.number().min(1, { message: 'User ID must be at least 1' }),
  username: z.string().min(1, { message: 'Username cannot be empty' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  fullName: fullNameSchema,
  age: z.number().min(0, { message: 'Age must be a non-negative number' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean(),
  hobbies: z.array(
    z.string().min(1, { message: 'Hobby name cannot be empty' }),
  ),
  address: addressSchema,
  orders: z.array(orderSchema),
});

export default userZodValidationSchema;
