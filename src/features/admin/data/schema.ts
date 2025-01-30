import { z } from 'zod';

const userRoleSchema = z.union([
  z.literal('admin'),
  z.literal('staff'),
]);

// Adjust schema to expect _id instead of id and map it
const userSchema = z.object({
  _id: z.string(), // id is optional here
  firstName: z.string(),
  lastName: z.string(),
  staffId: z.string(),
  role: userRoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Extend the schema with a transform to rename _id to id
export const userListSchema = z.array(
  userSchema.transform((data) => ({
    ...data,
    id: data._id,  // Rename _id to id
  }))
);

export type User = z.infer<typeof userSchema>;
