import React from "react";
import "../CSS/home.css";
import { Container } from "react-bootstrap";
import useProducts from "../Components/Product_hook_data";
import img1 from "../img/Product_1.jpg";
import img2 from "../img/Product_2.jpg";
import img3 from "../img/Product_3.jpg";
import img4 from "../img/Product_4.jpg";
import img5 from "../img/Product_5.jpg";
import img6 from "../img/Product_6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

const ProductGroup = ({ title, products, startIndex, isInOrder, onOrderClick }) => (
  <>
    <div className="div-text">
      <h1>{title}</h1>
    </div>
    <div className="reasons-grid">
      {products.map((product, i) => (
        <div className="reason-card" key={product.id}>
          <img
            src={images[startIndex + i]}
            alt={product.title}
            className="reason-card-img"
          />
          <h2 className="reason-card-title">{product.title}</h2>
          <p className="reason-card-text">Цена: {product.cost}</p>
          <button
            className="order-btn"
            onClick={() => onOrderClick(product.id)}
            disabled={isInOrder(product.id)}
          >
            {isInOrder(product.id) ? "В корзине" : "Заказать"}
          </button>
        </div>
      ))}
    </div>
  </>
);

export default function BagCraftPage() {
  const { products, orderProducts, loading, error, addToOrder } = useProducts();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const isInOrder = (id) => orderProducts.includes(id);
  const handleOrderClick = (id) => {
    if (!isInOrder(id)) addToOrder(id);
  };

  return (
    <div className="bagcraft-container">
      <Container fluid>
        <ProductGroup
          title="Сумки кожаные"
          products={products.slice(0, 3)}
          startIndex={0}
          isInOrder={isInOrder}
          onOrderClick={handleOrderClick}
        />
        <ProductGroup
          title="Сумки для путешествий"
          products={products.slice(3, 6)}
          startIndex={3}
          isInOrder={isInOrder}
          onOrderClick={handleOrderClick}
        />
      </Container>
    </div>
  );
}
