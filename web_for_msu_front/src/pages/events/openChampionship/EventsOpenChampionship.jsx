import styleEvents from '../events.module.css';
import ContactsSection from "../contactsSection/ContactsSection.jsx";
import {useSelector} from "react-redux";
import Form from "../../../generic/form/Form.jsx";
import {useEffect, useState} from "react";
import {getEventsOpenChampionshipDate} from "../../../api/eventsApi.js";

const EventsOpenChampionship = () => {

  const contacts = [
    {id: 0, name: 'Почта', email: 'olimpiada@emsch.ru'},
  ];

  const authStatus = useSelector(state => state.user.authStatus);
  const [dates, setDates] = useState([]);
  const numOfChampionships = new Date().getFullYear() - 2010;

  useEffect(() => {
    const getEventsOpenChampionshipDateFunc = async () => {
      const data = await getEventsOpenChampionshipDate();
      setDates(data);
    }

    getEventsOpenChampionshipDateFunc();
  }, []);

  return (
    <article>
      <h1>Открытый чемпионат школ по экономике</h1>

      <section className={styleEvents.section}>
        <p>Экономико-математическая школа при поддержке экономического факультета МГУ имени М.В.
          Ломоносова проводит <strong>Открытый чемпионат школ по экономике</strong> (ОЧ) для школьников 7-11 классов.
          Чемпионат состоится в стенах экономического факультета МГУ. После проведения мероприятия состоится
          церемония награждения победителей ОЧ – Закрытый день открытых дверей (ЗДОД).</p>
        <p>Открытый чемпионат — это уникальная возможность проверить свои знания, доказать, что именно ваша школа
          является лучшей школой по преподаванию экономики, получить призы, интересно и с пользой провести время.</p>
        <p>Победители Чемпионата зачисляются в ЭМШ <strong>без экзаменов</strong>.</p>
        <p>В этом учебном году Открытый чемпионат школ по экономике пройдёт уже в {numOfChampionships}й раз.</p>
        <p>Мы будем рады увидеть каждого любознательного школьника среди участников ОЧ!</p>
        <p>Подробная информация о регистрации и проведении Чемпионата доступна на <a
          href='https://openchampionship.ru/'>сайте</a>.</p>

        <aside className={`${styleEvents.asideRight} ${styleEvents.aside}`}>
          <h3>Важные даты:</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            {authStatus.includes('admin') ?
              <Form inputs={['dateOchStart', 'dateOchEnd']} values={{dateOchStart: dates[0], dateOchEnd: dates[1]}}
                    type='setDateOpenChampionship'
                    buttonText='Сохранить даты'
              /> :
              <>
                <p>Дата мероприятия: <strong>{dates[0]}</strong></p>
                <p>Дата церемонии награждения: <strong>{dates[1]}</strong></p>
              </>
            }
          </div>
          <ContactsSection header='Контакты организаторов' contacts={contacts}/>
        </aside>

      </section>
    </article>
  );
};

export default EventsOpenChampionship;