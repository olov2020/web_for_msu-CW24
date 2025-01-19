import style from './developers.module.css';
import closeIcon from '../../../../public/generic/closeIcon.svg'

// eslint-disable-next-line react/prop-types
const Frontend = ({setShowContext}) => {
  return (
    <article className={style.article}>
      <section className={style.section}>
        <h3>Привет, уважаемый посетитель сайта!</h3>

        <p>Меня зовут Владимир Виноградов, я frontend разработчик данного сайта - отвечаю за пользовательский
          опыт и дизайн. Был преподавателем ЭМШ на протяжении 2 лет и посетил 5 Летних школ - от 8 класса до
          преподавателя. Сайт разработан в 2024-2025 годах во время обучения на 2-3 курсах на заказ для ЭМШ. Мои
          соцсети: <a href='https://t.me/olovik_channel'>olovik</a></p>

        <img src={closeIcon} alt='Закрыть окно' onClick={() => setShowContext(0)}/>
      </section>
    </article>
  );
};

export default Frontend;