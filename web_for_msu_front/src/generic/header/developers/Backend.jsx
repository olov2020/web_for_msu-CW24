import style from './developers.module.css';
import closeIcon from '../../../../public/generic/closeIcon.svg'

// eslint-disable-next-line react/prop-types
const Backend = ({setShowContext}) => {
  return (
    <article className={style.article}>
      <section className={style.section}>
        <h3>Привет!</h3>

        <p>Я Дмитрий Мухин, и я backend-разработчик данного приложения. Полностью отвечаю за логику работы сайта и за
          хранение данных. Надеюсь, сайт получился для вас полезным. Для меня уж точно — это мой первый крупный проект,
          который меня многому научил. Учите Python, спите побольше, занимайтесь спортом. Пусть каждый найденный баг на
          этом сайте станет для вас мотивацией не бояться ошибаться. Контакт техподдержки (дорого): <a
            href='https://t.me/ddmitry3'>ddmitry3</a></p>

        <img src={closeIcon} alt='Закрыть окно' onClick={() => setShowContext(0)}/>
      </section>
    </article>
  );
};

export default Backend;