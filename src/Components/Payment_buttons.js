import React, { useState } from "react";

function PaymentButtons({ onClear, onSuccess, formData, validate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          orderId: "1"
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при оплате");
      }

      onSuccess(); // вызываем колбэк успешной оплаты
    } catch (err) {
      setError(err.message || "Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-buttons">
      <button
        type="button"
        className="btn-cancel"
        onClick={onClear}
        disabled={loading}
      >
        Отменить
      </button>

      <button
        type="button"
        className="btn-pay"
        onClick={handlePayment}  
        disabled={loading}
      >
        {loading ? "Оплата..." : "Оплатить"}
      </button>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default PaymentButtons;
