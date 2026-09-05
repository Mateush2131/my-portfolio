import { testimonials as initialTestimonials, type Testimonial } from './testimonials';

const STORAGE_KEY = 'alacode-reviews-v2';

function normalizeReview(item: Testimonial): Testimonial {
  return {
    ...item,
    rating: typeof item.rating === 'number' ? Math.min(5, Math.max(1, item.rating)) : 5,
    date: item.date || '—',
    role: item.role || 'Клиент',
    isIndividual: Boolean(item.isIndividual),
    company: item.isIndividual ? undefined : item.company?.trim() || undefined,
  };
}

export function getDefaultReviews(): Testimonial[] {
  return initialTestimonials.map(normalizeReview);
}

export function loadReviewsFromStorage(): Testimonial[] {
  if (typeof window === 'undefined') {
    return getDefaultReviews();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultReviews();
    }

    const stored = JSON.parse(raw) as Testimonial[];
    if (!Array.isArray(stored)) {
      return getDefaultReviews();
    }

    return stored
      .filter(
        (item) =>
          item &&
          typeof item.id === 'string' &&
          typeof item.text === 'string' &&
          typeof item.author === 'string',
      )
      .map(normalizeReview);
  } catch {
    return getDefaultReviews();
  }
}

export function saveReviews(reviews: Testimonial[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews.map(normalizeReview)));
}
