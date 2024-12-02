import style from './developers.module.css';
import closeIcon from '../../../../public/generic/closeIcon.svg'

const Frontend = ({setShowFrontend}) => {
  return (
    <section className={style.section}>
      <h3>Привет, уважаемый посетитель сайта!</h3>

      <p>Меня зовут Виноградов Владимир и я являюсь frontend разработчиком этого сайта.</p>
      <p>Меня зовут Виноградов Владимир и я являюсь frontend разработчиком этого сайта.</p>

      <img src={closeIcon} alt='Закрыть окно' onClick={() => setShowFrontend(false)}/>
    </section>
  );
};

export default Frontend;