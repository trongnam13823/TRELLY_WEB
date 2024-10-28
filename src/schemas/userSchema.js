import { z } from 'zod';

export default {
  fullname: z.string().min(2, "Please enter at least 2 characters").max(255, "Please enter less than 255 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().trim().min(6, "Please enter at least 6 characters"),
  totp: z.string().min(6, "Please enter a 6-digit code")
}
