import React, { useState } from 'react';

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: '', email: '', question: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="feedback-success">Спасибо за ваш вопрос!</div>;
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h3>Хотите задать вопрос?</h3>
      <label>
        Имя:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Вопрос:
        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
}
