import style from './home.module.css'
import Schedule from "../schedule/Schedule.jsx";
import News from "../news/News.jsx";
import Courses from "../courses/Courses.jsx";

const Home = () => {
  return (
    <main className={style.home}>

      <section className={style.left}>
        <Schedule/>
        <hr style={{
          margin: '5rem',
        }}/>
        <Courses/>
      </section>

      <section className={style.right}>
        <News/>
      </section>
    </main>
  );
};

export default Home;