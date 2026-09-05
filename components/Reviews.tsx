'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  getDefaultReviews,
  loadReviewsFromStorage,
  saveReviews,
} from '../lib/reviewsStorage';
import { censorReviewText, containsProfanity, type Testimonial } from '../lib/testimonials';
import SectionHeading from './SectionHeading';
import StarRating from './StarRating';

function formatReviewDate(date = new Date()): string {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getReviewSourceLabel(review: Testimonial): string {
  if (review.isIndividual) {
    return 'Индивидуальный заказ';
  }

  return review.company || 'Без компании';
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Testimonial[]>(getDefaultReviews);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({
    name: '',
    text: '',
    company: '',
    isIndividual: false,
    rating: 5,
  });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setReviews(loadReviewsFromStorage());
    setReady(true);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const text = form.text.trim();
    const company = form.company.trim();

    if (!name || !text) {
      setStatus('Заполните имя и текст отзыва.');
      return;
    }

    if (form.rating < 1) {
      setStatus('Выберите оценку от 1 до 5 звёзд.');
      return;
    }

    if (containsProfanity(text)) {
      setStatus('Отзыв содержит недопустимые слова. Пожалуйста, переформулируйте.');
      return;
    }

    const newReview: Testimonial = {
      id: `user-${Date.now()}`,
      text: censorReviewText(text),
      author: name,
      role: 'Клиент',
      company: form.isIndividual ? undefined : company || undefined,
      isIndividual: form.isIndividual,
      rating: form.rating,
      date: formatReviewDate(),
    };

    setReviews((prev) => {
      const next = [newReview, ...prev];
      saveReviews(next);
      return next;
    });

    setForm({ name: '', text: '', company: '', isIndividual: false, rating: 5 });
    setStatus('Спасибо! Отзыв опубликован.');
    setTimeout(() => setStatus(null), 3000);
  };

  if (!ready) {
    return null;
  }

  return (
    <section id="reviews" className="site-section">
      <div className="section-wrapper">
        <SectionHeading
          title="Отзывы"
          subtitle="Оставьте отзыв или почитайте, что говорят клиенты"
        />

        <form className="review-form glass-card reveal-on-scroll is-visible" onSubmit={handleSubmit}>
          <h4>Оставить отзыв</h4>

          <label className="sr-only" htmlFor="review-name">
            Имя
          </label>
          <input
            id="review-name"
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label className="sr-only" htmlFor="review-text">
            Отзыв
          </label>
          <textarea
            id="review-text"
            name="text"
            placeholder="Ваш отзыв"
            rows={4}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            required
          />

          <label className="sr-only" htmlFor="review-company">
            Компания
          </label>
          <input
            id="review-company"
            type="text"
            name="company"
            placeholder="Компания (если от бизнеса)"
            value={form.company}
            disabled={form.isIndividual}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />

          <div className="review-checkbox-field">
            <input
              type="checkbox"
              id="individual"
              checked={form.isIndividual}
              onChange={(e) =>
                setForm({
                  ...form,
                  isIndividual: e.target.checked,
                  company: e.target.checked ? '' : form.company,
                })
              }
            />
            <label htmlFor="individual">Индивидуальный заказ (не от бизнеса)</label>
          </div>

          <div className="review-rating-field">
            <span className="review-rating-label">Ваша оценка</span>
            <StarRating
              value={form.rating}
              onChange={(rating) => setForm({ ...form, rating })}
            />
          </div>

          <button type="submit" className="review-submit-btn">
            Отправить отзыв
          </button>
          {status ? <p className="review-form-status">{status}</p> : null}
        </form>

        {reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.map((item) => (
              <article key={item.id} className="glass-card review-card is-visible">
                <header className="review-card-header">
                  <cite>{item.author}</cite>
                  <span className="review-card-role">{getReviewSourceLabel(item)}</span>
                </header>
                <blockquote>&ldquo;{item.text}&rdquo;</blockquote>
                <StarRating value={item.rating} readonly label={`Оценка ${item.author}`} />
                <time className="review-card-date" dateTime={item.date}>
                  {item.date}
                </time>
              </article>
            ))}
          </div>
        ) : (
          <p className="reviews-empty">Пока нет отзывов. Будьте первым!</p>
        )}
      </div>
    </section>
  );
}
