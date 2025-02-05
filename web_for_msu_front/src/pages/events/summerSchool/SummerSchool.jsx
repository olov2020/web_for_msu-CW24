import styleEvents from '../events.module.css';
import ContactsSection from "../contactsSection/ContactsSection.jsx";
import {useEffect, useState} from "react";
import {getEventsSummerSchoolTeachers} from "../../../api/eventsApi.js";

const SummerSchool = () => {

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getEventsSummerSchoolTeachersFunc = async () => {
      const data = await getEventsSummerSchoolTeachers();
      setTeachers(data);
    }

    getEventsSummerSchoolTeachersFunc();
  }, []);

  return (
    <article>
      <h1>Летняя Школа</h1>

      <section className={styleEvents.section}>
        <p><strong>Что такое Летняя школа?</strong></p>

        <p>Впервые Летняя школа (ЛШ) была проведена в 2003 году.
          ЛШ – ежегодное мероприятие Экономико-математической школы при экономическом факультете МГУ, которое
          традиционно проводится в последних числах августа. В течение 10 дней в одном из подмосковных пансионатов
          школьники 8-11 классов слушают лекции и участвуют в семинарах по двум дисциплинам.</p>
        <p>Школьники <strong>8-10 классов</strong> до обеда изучают математику, после обеда – экономику. Программы по
          математике
          отличаются для каждого класса. Экономику все классы изучают вместе, однако для семинаров проходит разделение
          на группы по уровню знаний. Мы открываем две программы по экономике (на выбор): олимпиадная экономика и
          нестандартная экономика.</p>
        <p>Ребята, окончившие <strong>11 класс</strong>, посещают занятия по высшей математике и развивают навыки,
          полезные им в
          дальнейшем при обучении в вузе или при устройстве на работу (работа в программах Microsoft Office, деловое
          общение, переписка и т.д.).</p>
        <p><strong>Объем учебной нагрузки</strong> – около 6 часов в день, не считая времени, отводимого для выполнения
          самостоятельных заданий. Занятия ведут преподаватели ЭМШ.</p>
        <p>К участию в Летней школе приглашаются учащиеся ЭМШ, которые в текущем учебном году проходят обучение в
          8-11 классах. Слушатели Летней школы оплачивают проживание в пансионате, аренду лекционных залов, поездку в
          автобусе до пансионата и обратно. Даты и место проведения ЛШ уточняются.</p>

        <aside className={`${styleEvents.aside} ${styleEvents.asideRight}`}>
          <h3>Контакты:</h3>
          <p style={{
            textAlign: 'left',
          }}>Почта для общих вопросов: <a href='mailto:lsh@emsch.ru'>lsh@emsch.ru</a></p>

          {teachers && (
            <ContactsSection header='Ответственные за Летнюю школу' contacts={teachers}/>
          )}
        </aside>
      </section>
    </article>
  );
};

export default SummerSchool;