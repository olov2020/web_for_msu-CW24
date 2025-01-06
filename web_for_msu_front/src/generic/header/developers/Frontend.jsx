import style from './developers.module.css';
import closeIcon from '../../../../public/generic/closeIcon.svg'

// eslint-disable-next-line react/prop-types
const Frontend = ({setShowFrontend}) => {
  return (
    <section className={style.section}>
      <h3>Привет, уважаемый посетитель сайта!</h3>

      <p>Меня зовут Виноградов Владимир, я frontend разработчик данного сайта - отвечаю за дизайн и пользовательский опыт.
        Был преподавателем ЭМШ на протяжении 2 лет и посетил 5 Летних школ - от 8 класса до преподавателя. Сайт
      разработан в 2024-2025 годах в рамках Курсового проекта Высшей школы экономики. </p>

      <img src={closeIcon} alt='Закрыть окно' onClick={() => setShowFrontend(false)}/>
    </section>
  );
};

export default Frontend;