// ProductList.jsx
import React, { useEffect } from "react";
import ProductCard from "./Product_card";

export default function ProductList({ products, setProducts, onQuantityChange, onRemove, orderProducts }) {
  useEffect(() => {
    if (products.length === 0 && orderProducts && orderProducts.length > 0) {
      fetch("http://localhost:3001/products")
        .then(res => res.json())
        .then(data => {
          // Фильтруем товары согласно orderProducts и форматируем
          const filteredProducts = data.products
            .filter(item => orderProducts.includes(item.id))
            .map(item => ({
              id: item.id,
              name: item.title,
              price: Number(item.cost.replace(/\D/g, "")),
              image: `/img/Product_${item.id}.jpg`,
              quantity: 1
            }));
          setProducts(filteredProducts);
        })
        .catch(err => console.error("Ошибка загрузки товаров:", err));
    }
  }, [products, setProducts, orderProducts]);

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
