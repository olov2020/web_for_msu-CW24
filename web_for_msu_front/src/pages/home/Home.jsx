import style from './home.module.css'
import Schedule from "../schedule/Schedule.jsx";
import News from "../news/News.jsx";
import Courses from "../courses/Courses.jsx";

const Home = () => {
  return (
    <main className={style.home}>

      <section className={style.schedule}>
        <Schedule/>
      </section>

      <section className={style.news}>
        <News/>
      </section>

      <section className={style.myCourses}>
        <Courses/>
      </section>
    </main>
  );
};

export default Home;