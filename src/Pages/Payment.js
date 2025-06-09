import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../CSS/home.css";

import img1 from "../img/Product_1.jpg";
import img2 from "../img/Product_2.jpg";
import img3 from "../img/Product_3.jpg";
import img4 from "../img/Product_4.jpg";
import img5 from "../img/Product_5.jpg";
import img6 from "../img/Product_6.jpg";
import PaymentForm from "../Components/Payment_form";
import ProductList from "../Components/Product_list";

const productsDatabase = {
  "1": { name: "Сумка кожаная классическая", price: 3500, image: img1 },
  "2": { name: "Сумка кожаная из Италии", price: 20000, image: img2 },
  "3": { name: "Сумка кожаная", price: 3500, image: img3 },
  "4": { name: "Сумка для путешествий", price: 4500, image: img4 },
  "5": { name: "Сумка лёгкая", price: 2500, image: img5 },
  "6": { name: "Сумка чёрная", price: 3500, image: img6 }
};

const orderData = {
  order: [{ id: "1", order_products: ['1'] }]
};

// Простая функция валидации
function validateForm(formData) {
  const errors = {};

  if (!formData.fullName.trim() || formData.fullName.trim().split(" ").length < 2) {
    errors.fullName = "Введите полное имя (имя и фамилия)";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Введите телефон";
  } else if (!/^\+7\s?\(?\d{3}\)?\s?\d{3}[- ]?\d{2}[- ]?\d{2}$/.test(formData.phone)) {
    errors.phone = "Введите телефон в формате +7 (999) 123-45-67";
  }

  if (!formData.email.trim()) {
    errors.email = "Введите email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Введите корректный email";
  }

  if (!formData.address.trim()) {
    errors.address = "Введите адрес доставки";
  }

  if (!formData.cardNumber.trim()) {
    errors.cardNumber = "Введите номер карты";
  } else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
    errors.cardNumber = "Введите корректный номер карты из 16 цифр";
  }

  if (!formData.expiryDate.trim()) {
    errors.expiryDate = "Введите срок действия карты";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
    errors.expiryDate = "Введите срок действия в формате MM/YY";
  } else {
    const [month, year] = formData.expiryDate.split("/");
    const expiry = new Date(`20${year}`, month);
    const now = new Date();
    if (expiry < now) {
      errors.expiryDate = "Срок действия карты истёк";
    }
  }

  if (!formData.cvv.trim()) {
    errors.cvv = "Введите CVV";
  } else if (!/^\d{3,4}$/.test(formData.cvv)) {
    errors.cvv = "Введите CVV из 3 или 4 цифр";
  }

  return errors;
}

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const orderProducts = orderData.order[0].order_products;
    const loadedProducts = orderProducts.map(id => ({
      ...productsDatabase[id],
      id,
      quantity: 1
    }));
    setProducts(loadedProducts);
  }, []);

  useEffect(() => {
    const sum = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  }, [products]);

  const handleClear = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    });
    setProducts([]);
    setTotal(0);
    setErrors({});
  };

  const handlePayment = () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        handleClear();
      }, 5000);
    }
  };

  const handleQuantityChange = (id, delta) => {
    setProducts(products =>
      products.map(product =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  const handleRemoveProduct = id => {
    setProducts(products => products.filter(product => product.id !== id));
  };

  return (
    <div className="bagcraft-container">
      <Container className="payment-container">
        <h2 className="section-title">Оформление заказа</h2>
        <PaymentForm formData={formData} setFormData={setFormData} errors={errors} />

        <div className="products-section-payment">
          <h3>Ваши товары</h3>
          <ProductList
            products={products}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveProduct}
          />
        </div>

        <div className="total-section">
          <h3>Итого: {total} руб.</h3>
        </div>

        <div className="payment-buttons">
          <button type="button" className="btn-cancel" onClick={handleClear}>
            Отменить
          </button>
          <button type="button" className="btn-pay" onClick={handlePayment}>
            Оплатить
          </button>
        </div>

        {showSuccess && <div className="success-message">Оплата прошла успешно!</div>}
      </Container>
    </div>
  );
}
