'use client';

import { FormEvent, useState } from 'react';
import { parseJsonResponse } from '../lib/safeJson';
import SocialLinks from './SocialLinks';

const services = [
  'Telegram bot development',
  'Backend development',
  'Разработка лендингов',
  'Другое',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0],
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Отправляем на свой API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await parseJsonResponse<{ error?: string }>(response);
        throw new Error(error?.error || `Ошибка отправки (${response.status})`);
      }

      setStatus(
        '✅ Заявка отправлена! Я свяжусь с вами. На всякий случай продублируйте заказ в личные сообщения Telegram (@Alakir_22) — из‑за блокировок уведомление может не дойти.'
      );
      setForm({ name: '', email: '', phone: '', service: services[0], message: '' });
    } catch (err: any) {
      setStatus(`❌ Ошибка: ${err.message}. Попробуйте позже или напишите напрямую в Telegram.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="site-section">
      <div className="container">
        <div className="heading-wrapper">
          <div className="heading reveal-on-scroll">
            <h3 className="title">
              Хотите <br />
              связаться?
            </h3>
            <div className="separator" />
            <p className="subtitle">
              Telegram:{' '}
              <a href="https://t.me/Alakir_22" target="_blank" rel="noreferrer">
                @Alakir_22
              </a>
              <br />
              GitHub:{' '}
              <a href="https://github.com/Mateush2131" target="_blank" rel="noreferrer">
                github.com/Mateush2131
              </a>
              <br />
              Email:{' '}
              <a href="mailto:kopychev.mv@gmail.com">kopychev.mv@gmail.com</a>
              <br />
              Телефон: <a href="tel:+79819639360">89819639360</a>
            </p>
          </div>
          <div className="social reveal-on-scroll">
            <SocialLinks />
          </div>
        </div>
        <form id="contact-form" onSubmit={handleSubmit} className="reveal-on-scroll">
          <label className="sr-only" htmlFor="contact-name">
            Имя
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Имя"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="sr-only" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="sr-only" htmlFor="contact-phone">
            Телефон
          </label>
          <input
            id="contact-phone"
            type="text"
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <label className="sr-only" htmlFor="contact-service">
            Услуга
          </label>
          <select
            id="contact-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="contact-select"
          >
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="contact-message">
            Сообщение
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Сообщение"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
          <input type="submit" value={loading ? 'Отправка...' : 'Отправить'} disabled={loading} />
          {status ? <p className="form-status">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}