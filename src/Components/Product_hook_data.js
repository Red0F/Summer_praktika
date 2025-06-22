import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]); // id товаров в корзине
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка продуктов и корзины
  useEffect(() => {
    async function fetchData() {
      try {
        const productsRes = await fetch("http://localhost:3001/products");
        if (!productsRes.ok) throw new Error("Ошибка загрузки продуктов");
        const productsData = await productsRes.json();

        const orderRes = await fetch("http://localhost:3001/order");
        if (!orderRes.ok) throw new Error("Ошибка загрузки заказа");
        const orderData = await orderRes.json();

        setProducts(productsData);
        // Предполагаем, что orderData — объект с order_products массивом id
        setOrderProducts(orderData[0]?.order_products || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Функция добавления товара в корзину на сервере и локально
  const addToOrder = async (productId) => {
    try {
      // Отправляем PATCH или POST запрос для обновления order_products на сервере
      // Здесь пример с PATCH, предполагается, что сервер поддерживает обновление
      const updatedOrderProducts = [...orderProducts, productId];
      const res = await fetch("http://localhost:3001/order/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_products: updatedOrderProducts }),
      });
      if (!res.ok) throw new Error("Ошибка добавления в корзину");

      setOrderProducts(updatedOrderProducts);
    } catch (err) {
      setError(err.message);
    }
  };

  return { products, orderProducts, loading, error, addToOrder };
}
