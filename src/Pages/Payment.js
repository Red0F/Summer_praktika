import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../CSS/home.css";
import PaymentForm from "../Components/Payment_form";
import ProductList from "../Components/Product_list";
import img1 from "../img/Product_1.jpg";
import img2 from "../img/Product_2.jpg";
import img3 from "../img/Product_3.jpg";
import img4 from "../img/Product_4.jpg";
import img5 from "../img/Product_5.jpg";
import img6 from "../img/Product_6.jpg";

const imageMap = {
  "12": img1,
  "13": img2,
  "14": img3,
  "15": img4,
  "16": img5,
  "17": img6
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

  //инициализация состояний
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем все товары с сервера
        const productsResponse = await fetch("http://localhost:3001/products");
        const productsData = await productsResponse.json();

        // Получаем заказы покупателя с сервера
        const orderResponse = await fetch("http://localhost:3001/order");
        const orderData = await orderResponse.json();

        // Получаем изображения с сервера
        const mediaResponse = await fetch("http://localhost:3001/media");
        const mediaData = await mediaResponse.json();

        // Соединяеи данные о товарах с изображениями
        const productsDatabase = productsData.reduce((acc, product) => {
          const mediaItem = mediaData.find(
            media => media.pages === "products" && media.id === (parseInt(product.id) + 11).toString()
          );
          acc[product.id] = {
            name: product.title,
            price: parseInt(product.cost.replace(" руб.", "")),
            image: mediaItem ? imageMap[mediaItem.id] : null
          };
          return acc;
        }, {});

        // Загружаем данные с сервера
        const orderProducts = orderData[0].order_products;
        const loadedProducts = orderProducts
          .filter(id => productsDatabase[id]) 
          .map(id => ({
            ...productsDatabase[id],
            id,
            quantity: 1
          }));
        setProducts(loadedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Ошибка при загрузке данных. Попробуйте позже.");
      }
    };

    fetchData();
  }, []);

  //Подсчёт итоговой суммы корзины
  useEffect(() => {
    const sum = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  }, [products]);

  //Очищение формы
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

  //Убирает все выбранные товары с сервера, очищает корзтну 
  const handlePayment = async () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Очищает корзину на сервере
        await fetch("http://localhost:3001/order/1", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ order_products: [] })
        });

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          handleClear();
        }, 5000);
      } catch (error) {
        console.error("Error clearing cart on server:", error);
        alert("Ошибка при очистке корзины. Пожалуйста, попробуйте снова.");
      }
    }
  };

  //Изменение количества определленого товара в корзине на значение delta
  const handleQuantityChange = (id, delta) => {
    setProducts(products =>
      products.map(product =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  const handleRemoveProduct = async id => {
    try {
      // Получаем данные с сервера о выбранных товарах
      const orderResponse = await fetch("http://localhost:3001/order/1");
      if (!orderResponse.ok) {
        throw new Error("Failed to fetch order");
      }
      const orderData = await orderResponse.json();

      // Удаляем из корзины товар с выбранным ID
      const updatedOrderProducts = orderData.order_products.filter(productId => productId !== id);

      // Обновляем данные на сервере
      const updateResponse = await fetch("http://localhost:3001/order/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ order_products: updatedOrderProducts })
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update order on server");
      }

      // Обновляем локальные данные для отображения
      setProducts(products => products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error removing product from server:", error); //Обработка ошибок
      alert("Ошибка при удалении товара. Попробуйте снова.");
    }
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