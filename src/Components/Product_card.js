import React from "react";
import trashIcon from "../img/Icon_trash.png";

export default function ProductCard({ product, onQuantityChange, onRemove }) {
  return (
    <div className="product-card-payment">
      <div className="product-image-payment">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info-payment">
        <h4>{product.name}</h4>
        <p>Цена: {product.price} руб.</p>

        <span className="quantity-label">Количество товара</span>

        <div className="quantity-controls">
          <div className="quantity-wrapper">
            <button
              className="quantity-btn"
              onClick={() => onQuantityChange(product.id, -1)}
              disabled={product.quantity <= 1}
            >
              -
            </button>
            <span className="quantity-display">{product.quantity}</span>
            <button className="quantity-btn" onClick={() => onQuantityChange(product.id, 1)}>
              +
            </button>
            <button
              className="remove-btn"
              onClick={() => onRemove(product.id)}
              title="Удалить товар"
            >
              <img src={trashIcon} alt="Удалить" className="trash-icon"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}