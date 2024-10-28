import { z } from 'zod';

export default {
  background: z.string().min(1, "Please select a background"),
  title: z.string().min(1, "Please enter a name for your board").max(255, "Board name must be less than 255 characters")
}