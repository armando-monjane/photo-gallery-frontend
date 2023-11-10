import * as z from 'zod';

/**
 * schema object that defines the validation rules for the sign up form.
 * It includes validation for the first name, last name, email, password, and confirm password fields.
 */
export const FormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Please provide a valid email.',
    }),
    password: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters.',
      })
      .refine(
        (value) => /\d/.test(value),
        'Password must contain at least one digit',
      ),
    confirmPassword: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: `Passwords don't match.`,
    path: ['confirmPassword'],
  });
