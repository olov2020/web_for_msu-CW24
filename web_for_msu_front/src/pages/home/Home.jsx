import style from './home.module.css'
import Schedule from "../schedule/Schedule.jsx";
import Achievements from "../../generic/achievements/Achievements.jsx";
import News from "../news/News.jsx";

const Home = () => {
  return (
    <main className={style.home}>

      <section className={style.schedule}>
        <Schedule/>
      </section>

      <section className={style.news}>
        <News/>
      </section>

      <section className={style.achievements}>
        <Achievements/>
      </section>
    </main>
  );
};

export default Home;