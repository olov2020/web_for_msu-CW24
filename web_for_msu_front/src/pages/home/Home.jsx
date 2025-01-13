import style from './home.module.css'
import Schedule from "../schedule/Schedule.jsx";
import News from "../news/News.jsx";
import Courses from "../courses/Courses.jsx";
import {useSelector} from "react-redux";
import About from "../about/About.jsx";

const Home = () => {

  const userStatus = useSelector(state => state.user.authStatus);

  return (
    <main className={style.home}>
      {(userStatus.includes('pupil') || userStatus.includes('teacher')) ?
        <section>
          <Schedule/>

          <hr style={{
            margin: '5rem',
          }}/>
          <Courses/>
        </section> :

        <section>
          <About/>
        </section>
      }

      <section>
        <News/>
      </section>
    </main>
  );
};

export default Home;