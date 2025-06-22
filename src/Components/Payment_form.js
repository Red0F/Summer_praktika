import React from "react";

export default function PaymentForm({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="payment-form">
      <div className="form-group">
        <label htmlFor="fullName">ФИО</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Иванов Иван Иванович"
          required
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Телефон</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 123-45-67"
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@mail.com"
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Адрес доставки</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="г. Москва, ул. Ленина, д. 1"
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>

      <hr />

      <div className="form-group">
        <label htmlFor="cardNumber">Номер карты</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label htmlFor="expiryDate">Срок действия (MM/YY)</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="12/24"
            maxLength={5}
            required
          />
          {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
        </div>

        <div className="form-group half-width">
          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={4}
            required
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </div>
      </div>
    </div>
  );
}
