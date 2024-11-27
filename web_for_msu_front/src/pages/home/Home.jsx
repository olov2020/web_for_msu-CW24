import style from './home.module.css'
import Schedule from "../schedule/Schedule.jsx";
import News from "../news/News.jsx";
import Courses from "../courses/Courses.jsx";
import {useSelector} from "react-redux";

const Home = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  return (
    <main className={style.home}>
      {(userStatus.includes('pupil') || userStatus.includes('teacher')) ?
        <section className={style.left}>
          <Schedule/>

          <hr style={{
            margin: '5rem',
          }}/>
          <Courses/>
        </section> :

        <section style={{
          display: 'flex',
          justifyContent: 'center',
          width: '90%',
        }}>
          <h1>Описание ЭМШ</h1>
        </section>
      }

      <section className={style.right}>
        <News/>
      </section>
    </main>
  );
};

export default Home;