import React from 'react';
import '../CSS/footer.css';

function Footer() {
  return (
    <footer>
      <div className="separator-bar"  />
      <div className="footer-content">
        <div className="footer-col copyright">
          © Интернет-магазин сумок "BigCraft", 2015
        </div>
        <div className="footer-col right">
          <div className="contact-item">
            <div>Почта:</div>
            <div>info@bagcraft.ru</div>
          </div>
          <div className="contact-item">
            <div>Телефон:</div>
            <div>+7 (495) 123-45-67</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
