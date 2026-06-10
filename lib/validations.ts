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

export const OrderIdSchema = z.object({
  id: z.string().regex(/^[0-9]+$/),
});
