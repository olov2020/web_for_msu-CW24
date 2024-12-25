import styleEvents from '../events.module.css';
import {useEffect, useState} from "react";
import {getEventsOpenChampionshipTeachers} from "../../../api/eventsApi.js";
import TeachersSection from "../teachersSection/TeachersSection.jsx";

const EventsOpenChampionship = () => {

  const [teachers, setTeachers] = useState([
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
  ]);

  useEffect(() => {
    const getEventsOpenChampionshipTeachersFunc = async () => {
      const data = await getEventsOpenChampionshipTeachers();
      setTeachers(data);
    }

    getEventsOpenChampionshipTeachersFunc();
  }, []);

  return (
    <article>
      <h1>Открытый чемпионат школ по экономике</h1>

      <section className={styleEvents.section}>
        <p>В 2021-22 учебном году Экономико-математическая школа при поддержке экономического факультета МГУ имени М.В.
          Ломоносова проводит <strong>Открытый чемпионат школ по экономике</strong> (ОЧ) для школьников 7-11 классов.
          Чемпионат состоится
          17 апреля 2022 года очно, в стенах экономического факультета МГУ. А 15 мая 2022 года состоится церемония
          награждения победителей ОЧ – Закрытый день открытых дверей (ЗДОД).</p>
        <p>Открытый чемпионат — это уникальная возможность проверить свои знания, доказать, что именно ваша школа
          является лучшей школой по преподаванию экономики, получить призы, интересно и с пользой провести время.</p>
        <p>Победители Чемпионата зачисляются в ЭМШ <strong>без экзаменов</strong>.</p>
        <p>В этом учебном году Открытый чемпионат школ по экономике пройдёт уже в 12й раз.</p>
        <p>Мы будем рады увидеть каждого любознательного школьника среди участников ОЧ!</p>
        <p>Подробная информация о регистрации и проведении Чемпионата доступна на <a
          href='https://openchampionship.ru/'>сайте</a>.</p>

        {teachers && (
          <aside className={styleEvents.asideRight}>
            <TeachersSection header='Ответственные за Открытый Чемпионат' teachers={teachers}/>
          </aside>
        )}
      </section>
    </article>
  );
};

export default EventsOpenChampionship;