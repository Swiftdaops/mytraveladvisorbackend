const { z } = require('zod');

const tripValidation = z.object({
  name: z.string().min(2, 'Name is too short'),
  dailyCost: z.coerce.number().positive('Cost must be a positive number'),
  image: z.string().url().optional(),
  description: z.string().optional(),
  active: z.coerce.boolean().optional(),
});

module.exports = tripValidation;
