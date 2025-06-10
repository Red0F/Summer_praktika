import React from "react";
import ProductCard from "./Product_card";

export default function ProductList({ products, onQuantityChange, onRemove }) {

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
