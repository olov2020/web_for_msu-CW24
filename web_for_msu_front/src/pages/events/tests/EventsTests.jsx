import {useEffect, useState} from "react";
import {
  getEventsTestsOfflineTeachers,
  getEventsTestsOnlineTeachers,
} from "../../../api/eventsApi.js";
import styleEvents from '../events.module.css';
import ContactsSection from "../contactsSection/ContactsSection.jsx";

const EventsTests = () => {

  function getThirdSunday(year, month) {
    // Create a date object for the first day of the desired month
    let date = new Date(year, month, 1);

    // Find the first Sunday of the month
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() + 1);
    }

    // Add two weeks (14 days) to get the third Sunday
    date.setDate(date.getDate() + 14);

    return date.getDate();
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = 8;
  const examDate = getThirdSunday(year, month);

  const [testsOfflineTeachers, setTestsOfflineTeachers] = useState([]);
  const [testsOnlineTeachers, setTestsOnlineTeachers] = useState([]);

  useEffect(() => {
    const getEventsTestsOfflineTeachersFunc = async () => {
      const data = await getEventsTestsOfflineTeachers();
      setTestsOfflineTeachers(data);
    }

    const getEventsTestsOnlineTeachersFunc = async () => {
      const data = await getEventsTestsOnlineTeachers();
      setTestsOnlineTeachers(data);
    }

    getEventsTestsOfflineTeachersFunc();
    getEventsTestsOnlineTeachersFunc();
  }, []);

  return (
    <article>
      <h1>Как поступить?</h1>

      <section className={styleEvents.section}>
        <p><strong>{examDate} сентября {year}</strong> абитуриентам предстоит написать два теста: по математике и
          общеобразовательный (тест на общую эрудицию).</p>
        <p>При успешном прохождении тестов в следующее воскресенье, <strong>{examDate + 7} сентября</strong>, школьникам
          предстоит заключительная ступень Вступительных экзаменов — <strong>собеседование</strong>.</p>
        <p>Традиционно результаты экзаменов вывешиваются на сайте ЭМШ ориентировочно <strong>в первый четверг</strong>,
          следующий за днём экзамена.</p>
        <p>Существует <strong>только одна</strong> возможность поступить не по результатам вступительных экзаменов — это
          победа в <strong><a href='https://openchampionship.ru/'>Открытом чемпионате школ по экономике</a></strong>.
          Подробную
          информацию об ОЧ можно найти на сайте Чемпионата. Никакие другие достижения не дают преимущественное право
          поступления в Школу.</p>
        <p>В 2017 году мы запустили платформу <strong><a href='https://testsemsch.ru/'>testsemsch.ru</a></strong>, на
          которой размещены варианты общеобразовательного и математического тестов прошлых лет — это тот формат заданий,
          который предложат абитуриентам на первом туре Вступительных. Решая тесты на сайте, все школьники смогут
          попробовать свои силы и подготовиться к экзамену.</p>
        <p>Также у Школы есть <strong>онлайн-отделение</strong>, обучение на котором предусмотрено только для
          школьников, проживающих и учащихся <strong>за пределами Москвы</strong>.</p>
        <p>Если у вас остались какие-либо вопросы о процедуре и содержании Вступительных испытаний, пишите на
          почту <strong><a href='mailto:apply@emsch.ru'>apply@emsch.ru</a></strong>.</p>
        <p>Мы всегда рады помочь!</p>

        {testsOfflineTeachers && (
          <aside className={`${styleEvents.asideRight} ${styleEvents.aside}`}>
            <h3>Важные даты вступительных:</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              <p><strong>1 этап - {examDate} сентября</strong></p>
              <p><strong>2 этап - {examDate + 7} сентября</strong></p>
            </div>
            <ContactsSection header='Ответственные за офлайн вступительные' contacts={testsOfflineTeachers}/>
          </aside>
        )}

        <aside className={`${styleEvents.asideLeft} ${styleEvents.aside}`}>
          <h2><a href='https://emsch.timepad.ru/events/'>Регистрация на вступительные</a></h2>
        </aside>
      </section>

      <h1>ЭМШ-онлайн</h1>

      <section className={styleEvents.section}>
        <p>Если ты учишься <strong>не в Москве</strong>, но давно хотел учиться в Экономико-математической школе при МГУ
          (ЭМШ), то специально для тебя мы запускаем «ЭМШ-онлайн», приуроченную к юбилею ЭМШ (нам 55 лет!). Теперь ЭМШ
          доступна для школьников со всех уголков России. Мы рады, что география перестанет быть барьером для учёбы в
          ЭМШ и с радостью приглашаем школьников из регионов стать частью большой семьи ЭМШ!</p>
        <p>Данный формат школы предназначен для учащихся 8-11 классов, проживающих за пределами Москвы. К обучению в
          ЭМШ-онлайн допускаются школьники из всех регионов, кроме Москвы, успешно прошедшие вступительные испытания.
          Школьникам, учащимся Московских школ, недоступно поступление в подразделение ЭМШ-онлайн. Они могут поступать
          только в основное подразделение ЭМШ. Но это не означает, что школьникам из Москвы будут доступны только очные
          курсы, они также смогут посещать онлайн и гибридные курсы.</p>
        <p>Занятия проводятся онлайн в традиционной для Университета форме лекций или семинаров по разным предметам.
          Ученики сами выбирают нужные именно им дисциплины. Время проведения занятий: будние дни, начало пар в 17:20 и
          в 18:55 по московскому времени, с октября по май.</p>
        <p>Если у вас остались какие-либо вопросы об обучении или поступлении в онлайн подразделение ЭМШ, пишите на
          почту <strong><a href='mailto:online@emsch.ru'>online@emsch.ru</a></strong>.</p>
        {testsOnlineTeachers && (
          <aside className={`${styleEvents.asideRight} ${styleEvents.aside}`}>
            <ContactsSection header='Ответственные за онлайн вступительные' contacts={testsOnlineTeachers}/>
          </aside>
        )}
      </section>

    </article>
  );
};

export default EventsTests;