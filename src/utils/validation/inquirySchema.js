const { z } = require('zod');

const inquiryValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  transportation: z.string().optional(),
  tripType: z.string().optional(),
  travelers: z
    .object({
      adults: z.coerce.number().min(0).optional(),
      children: z.coerce.number().min(0).optional(),
      seniors: z.coerce.number().min(0).optional(),
    })
    .optional(),
  accommodation: z.string().optional(),
  travelersInfo: z.string().optional(),
  activities: z.array(z.string()).optional(),
  activitiesOther: z.string().optional(),
  destination: z.string().optional(),
  travelDates: z
    .object({
      start: z.coerce.date().optional(),
      end: z.coerce.date().optional(),
    })
    .optional(),
  budget: z.string().optional(),
});

module.exports = inquiryValidation;
