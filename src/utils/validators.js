const { z } = require('zod');

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

exports.listingSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().optional(),
  accommodationEstimate: z
    .object({
      minPerDay: z.coerce.number().optional(),
      maxPerDay: z.coerce.number().optional(),
      avgPerDay: z.coerce.number().optional(),
    })
    .optional(),
  images: z.array(z.object({ url: z.string().url(), public_id: z.string().optional() })).optional(),
});
