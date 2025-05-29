import React from "react";
import "../CSS/home.css";
import { Container } from "react-bootstrap";
import img1 from '../img/advantage 1.jpg';
import img2 from '../img/advantage 2.jpg';
import img3 from '../img/advantage 3.jpg';
import img4 from '../img/advantage 4.jpg';
import img5 from '../img/advantage 5.jpg';

const reasons = [
  {
    img: img1,
    title: "Высокое качество материалов",
    text: "Мы используем только премиальную натуральную кожу и современные прочные ткани, чтобы ваши сумки служили долго и выглядели безупречно.",
  },
  {
    img: img2,
    title: "Уникальный дизайн и разнообразие моделей",
    text: "В нашем каталоге вы найдете сумки на любой вкус: от классических до ультрамодных, от повседневных до деловых и дорожных.",
  },
  {
    img: img3,
    title: "Удобство и функциональность",
    text: "Каждая сумка продумана до мелочей – удобные отделения, надежные застежки и эргономичные формы.",
  },
  {
    img: img4,
    title: "Индивидуальный подход",
    text: "Мы ценим каждого клиента и готовы помочь с выбором, а также предлагаем услуги персонализации.",
  },
  {
    img: img5,
    title: "Гарантия и поддержка",
    text: "BagCraft обеспечивает полную гарантию качества и быструю поддержку на всех этапах покупки.",
  },
];

export default function BagCraftPage() {
  return (
    
      <div className="bagcraft-container">
        <Container fluid>
          <div className="div-text">
            <h1>Добро пожаловать в BagCraft – искусство создания идеальных сумок!</h1>
            <p>
              В BagCraft мы верим, что сумка – это не просто аксессуар, а отражение вашего стиля, характера и образа жизни. Наша миссия – предложить вам качественные, стильные и функциональные сумки, которые станут надежными спутниками в каждом вашем дне.
            </p>
            <h1>Почему выбирают BagCraft?</h1>
          </div>
          <div className="reasons-list">
            {reasons.map((reason, idx) => (
              <div className="reason-item-vertical" key={idx}>
                <div className="div-img">
                  <img src={reason.img} alt={reason.title} className="reason-img" />
                </div>
                <div className="div-text">
                  <h1>{reason.title}</h1>
                  <p>{reason.text}</p>
                </div>
              </div>
            ))}
          </div>    
        </Container>
      </div>
    
  );
}
