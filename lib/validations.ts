import { z } from 'zod';

export const OrderSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Неверный email'),
  phone: z.string().min(5, 'Введите телефон'),
  service: z.string().min(2, 'Выберите услугу'),
  message: z.string().optional(),
});

export const OrderStatusSchema = z.object({
  status: z.string().min(1),
});

export const OrderUpdateSchema = z
  .object({
    status: z.enum(['new', 'in_progress', 'done', 'rejected']).optional(),
    priority: z.enum(['low', 'normal', 'high']).optional(),
    deadline: z.string().datetime().nullable().optional(),
    adminNotes: z.string().max(2000).nullable().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'Нужно передать хотя бы одно поле',
  });

export const OrderIdSchema = z.object({
  id: z.string().regex(/^[0-9]+$/),
});
