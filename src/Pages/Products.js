import React from "react";
import "../CSS/home.css";
import { Container } from "react-bootstrap";
import img1 from '../img/Product_1.jpg';
import img2 from '../img/Product_2.jpg';
import img3 from '../img/Product_3.jpg';
import img4 from '../img/Product_4.jpg';
import img5 from '../img/Product_5.jpg';
import img6 from '../img/Product_6.jpg';

const data1 = [
  {
    img: img1,
    title: "Сумка кожаная",
    text: "Цена: 3500 руб.",
  },
  {
    img: img2,
    title: "Сумка кожаная Италия",
    text: "Цена: 20000 руб.",
  },
  {
    img: img3,
    title: "Сумка кожаная",
    text: "Цена: 3500 руб.",
  },
  {
    img: img4,
    title: "Сумка для путешествий",
    text: "Цена: 4500 руб.",
  },
  {
    img: img5,
    title: "Сумка легкая",
    text: "Цена: 2500 руб.",
  },
  {
    img: img6,
    title: "Сумка чёрная",
    text: "Цена: 3500 руб.",
  },
];

export default function BagCraftPage() {
  return (
    <div className="bagcraft-container">
      <Container fluid>
        <div className="div-text">
          <h1>Сумки кожаные</h1>
        </div>
        <div className="reasons-grid">
          {data1.slice(0, 3).map((reason, idx) => (
            <div className="reason-card" key={idx}>
              <img src={reason.img} alt={reason.title} className="reason-card-img" />
              <h2 className="reason-card-title">{reason.title}</h2>
              <p className="reason-card-text">{reason.text}</p>
              <button className="order-btn">Заказать</button>
            </div>
          ))}
        </div>
        <div className="div-text">
          <h1>Сумки для путешествий</h1>
        </div>
        <div className="reasons-grid">
          {data1.slice(3, 6).map((reason, idx) => (
            <div className="reason-card" key={idx}>
              <img src={reason.img} alt={reason.title} className="reason-card-img" />
              <h2 className="reason-card-title">{reason.title}</h2>
              <p className="reason-card-text">{reason.text}</p>
              <button className="order-btn">Заказать</button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
