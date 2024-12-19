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
          <p style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 .2rem',
          }}>Телефон - <a href='tel:+74959391606'>8 (495) 939-16-06</a></p>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 .2rem',
          }}>E-mail - <a href='mailto:info@emsch.ru'>info@emsch.ru</a></p>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 .2rem',
          }}><a href='https://vk.com/emsch'>ЭМШ ВКонтакте</a></p>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 .2rem',
          }}><a href='https://t.me/emsch_msu'>Телеграм ЭМШ</a></p>
        </div>
      </div>

      <div>
        <p>Copyright © {date.getFullYear()} ЭМШ. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;