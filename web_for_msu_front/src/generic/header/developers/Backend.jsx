import style from './developers.module.css';
import closeIcon from '../../../../public/generic/closeIcon.svg'

// eslint-disable-next-line react/prop-types
const Backend = ({setShowFrontend}) => {
  return (
    <section className={style.section}>
      <h3>Привет, уважаемый посетитель сайта!</h3>

      <p>Меня зовут Виноградов Владимир, я frontend разработчик данного сайта. Был преподавателем ЭМШ на протяжении 2
        лет и посетил 5 Летних школ - от 8 класса до преподавателя</p>

      <img src={closeIcon} alt='Закрыть окно' onClick={() => setShowFrontend(false)}/>
    </section>
  );
};

export default Backend;