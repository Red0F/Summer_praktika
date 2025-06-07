import React from 'react';
import "../CSS/home.css";
import { Container } from "react-bootstrap";
import img1 from '../img/Icon_phone.png';
import img2 from '../img/Icon_email.png';
import img3 from '../img/Icon_telegram.png';
import img4 from '../img/Icon_whatshap.png';
import img5 from '../img/Icon_build.png';
import {TextList} from "../Components/Support_hook_text";
import FeedbackForm from '../Components/Feedback_support';

const reasons = [
  {
    img: img1,
    title: "Телефон",
    text: "Телефон: +7 (495) 123-45-67",
  },
  {
    img: img2,
    title: "Почта",
    text: "Почта: info@bagcraft.ru",
  },
  {
    img: img3,
    title: "Телеграмм",
    text: "Telegramm: https://t.me/bagcraft_official",
  },
  {
    img: img4,
    title: "Вэтсап",
    text: "WhatsApp: https://wa.me/74951234567",
  },
  {
    img: img5,
    title: "Адрес",
    text: "Адрес: Москва, ул. Примерная, д. 10, ТЦ «Стильный Дом», павильон 15",
  },
];



export default function BagCraftPage() {
  return (
    
      <div className="bagcraft-container">
        <Container fluid>
          <div className="reasons-list-support">
            {reasons.map((reason, idx) => (
              <div className="reason-item-vertical-support" key={idx}>
                <div className="div-img">
                  <img src={reason.img} alt={reason.title} className="support-img" />
                </div>
                <div className="div-text">
                  <p>{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
          <TextList />   
          <FeedbackForm /> 
        </Container>
      </div>
    
  );
}