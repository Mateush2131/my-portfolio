'use client';

import { FaStar } from 'react-icons/fa';

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  label?: string;
};

export default function StarRating({
  value,
  onChange,
  readonly = false,
  label = 'Рейтинг',
}: StarRatingProps) {
  return (
    <div
      className={`star-rating ${readonly ? 'star-rating--readonly' : ''}`}
      role={readonly ? 'img' : 'group'}
      aria-label={readonly ? `${label}: ${value} из 5` : label}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const filled = starValue <= value;

        if (readonly) {
          return (
            <span
              key={starValue}
              className={`star-rating-star ${filled ? 'star-rating-star--filled' : ''}`}
              aria-hidden="true"
            >
              <FaStar />
            </span>
          );
        }

        return (
          <button
            key={starValue}
            type="button"
            className={`star-rating-btn ${filled ? 'star-rating-btn--active' : ''}`}
            onClick={() => onChange?.(starValue)}
            aria-label={`${starValue} из 5`}
          >
            <FaStar />
          </button>
        );
      })}
    </div>
  );
}
