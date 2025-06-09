import { useState } from "react";

// Кастомный хук для валидации данных формы оплаты
export default function usePaymentValidation(formData) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Пожалуйста, введите ФИО";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Пожалуйста, введите Email";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Пожалуйста, введите корректный Email";
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Пожалуйста, введите адрес доставки";
    }

    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Пожалуйста, введите номер карты";
      } else {
        const cardNumberClean = formData.cardNumber.replace(/\s+/g, "");
        if (!/^\d{16}$/.test(cardNumberClean)) {
          newErrors.cardNumber = "Номер карты должен содержать 16 цифр";
        }
      }
      if (!formData.expiryMonth.trim()) {
        newErrors.expiryMonth = "Пожалуйста, введите срок действия карты";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryMonth)) {
        newErrors.expiryMonth = "Срок действия должен быть в формате ММ/ГГ";
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "Пожалуйста, введите CVV";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV должен содержать 3 или 4 цифры";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
}
