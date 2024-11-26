import style from './footer.module.css'

const Footer = () => {

  const date = new Date();

  return (
    <footer className={style.footer}>
      <div>
        <h3>Адрес:</h3>
        <p>119991, Москва, Ленинские горы, III Гуманитарный корпус, д. 1, стр. 46, Экономический факультет, к.364.</p>
      </div>

      <div>
        <h3>Контакты:</h3>

        <div>
          <p>Телефон - 8 (495) 939-16-06</p>
          <p>E-mail - info@emsch.ru</p>
          <p>Вконтакте - </p>
          <p style={{
            display: 'flex',
            gap: '0 .2rem',
          }}>Телеграм - <a href='https://t.me/emsch_msu'>ЭМШ</a></p>
        </div>
      </div>

      <div>
        <p>Copyright © {date.getFullYear()} ЭМШ. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;