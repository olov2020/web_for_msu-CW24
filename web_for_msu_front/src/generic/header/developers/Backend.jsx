import style from './developers.module.css';
import closeIcon from '../../../../public/generic/closeIcon.svg'

// eslint-disable-next-line react/prop-types
const Backend = ({setShowContext}) => {
  return (
    <article className={style.article}>
      <section className={style.section}>
        <h3>Привет, уважаемый посетитель сайта!</h3>

        <p>Меня зовут Мухин Дмитрий</p>

        <img src={closeIcon} alt='Закрыть окно' onClick={() => setShowContext(0)}/>
      </section>
    </article>
  );
};

export default Backend;