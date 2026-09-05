import { censorProfanity, containsProfanity } from './profanity';

export type Testimonial = {
  id: string;
  text: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  company?: string;
  isIndividual?: boolean;
};

export { censorProfanity as censorReviewText, containsProfanity };

export const testimonials: Testimonial[] = [];
