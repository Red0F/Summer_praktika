import React, { useState } from "react";

export default function OrderButton({ productId }) {
  const [status, setStatus] = useState(null);

  const handleOrder = async () => {
    try {
      // Предполагается, что на сервере есть эндпоинт для добавления id товара в заказ
      const response = await fetch("http://localhost:3001/order/1", {
        method: "PATCH", // или POST, в зависимости от архитектуры API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_products: [productId], // отправляем id товара в массив order_products
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при сохранении заказа");
      }

      setStatus("Заказ успешно сохранён");
    } catch (error) {
      setStatus(`Ошибка: ${error.message}`);
    }
  };

  return (
    <>
      <button className="order-btn" onClick={handleOrder}>
        Заказать
      </button>
      {status && <p>{status}</p>}
    </>
  );
}
