import {useEffect, useState} from "react";
import {
  getEventsTestsOfflineTeachers,
  getEventsTestsOnlineTeachers,
  getStatusRegistrationTests
} from "../../../api/eventsApi.js";
import TestsRegistration from "./testsRegistration/TestsRegistration.jsx";

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

  const [testsOfflineTeachers, setTestsOfflineTeachers] = useState([
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
  ]);
  const [testsOnlineTeachers, setTestsOnlineTeachers] = useState([
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
  ]);

  const [statusRegistrationTests, setStatusRegistrationTests] = useState(true);

  useEffect(() => {
    const getEventsTestsOfflineTeachersFunc = async () => {
      const data = await getEventsTestsOfflineTeachers();
      setTestsOfflineTeachers(data);
    }

    const getEventsTestsOnlineTeachersFunc = async () => {
      const data = await getEventsTestsOnlineTeachers();
      setTestsOnlineTeachers(data);
    }

    const getStatusRegistrationTestsFunc = async () => {
      const data = await getStatusRegistrationTests();
      setStatusRegistrationTests(data);
    }

    getEventsTestsOfflineTeachersFunc();
    getEventsTestsOnlineTeachersFunc();
    getStatusRegistrationTestsFunc();
  }, []);

  return (
    <article>
      <h1>Как поступить?</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        gap: '1rem 0',
      }}>
        <p><strong>{examDate} сентября {year}</strong> года абитуриентам предстоит написать два теста: по математике и
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
          <aside style={{
            position: 'absolute',
            right: '2rem',
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '2rem 0',
          }}>
            <h3>Ответственные за очные вступительные испытания</h3>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '.3rem 0',
            }}>
              {testsOfflineTeachers.map((teacher) => (
                <li key={teacher.id} style={{
                  listStyleType: 'none',
                }}>
                  <p>{teacher.name}: <a href={`tel:${teacher.phone}`}>{teacher.phone}</a></p>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </section>

      <h1>ЭМШ-онлайн</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        gap: '1rem 0',
      }}>
        <p>Если ты учишься <strong>не в Москве</strong>, но давно хотел учиться в Экономико-математической школе при МГУ
          (ЭМШ), то специально для тебя мы запускаем «ЭМШ-онлайн», приуроченную к юбилею ЭМШ (нам 55 лет!). Теперь ЭМШ
          доступна для школьников со всех уголков России. Мы рады, что география перестанет быть барьером для учёбы в
          ЭМШ и с радостью приглашаем школьников из регионов стать частью большой семьи ЭМШ!</p>
        <p>Данный формат школы предназначен для учащихся 8-11 классов, проживающих за пределами Москвы. К обучению в
          ЭМШ-онлайн допускаются школьники из всех регионов, кроме Москвы, успешно прошедшие вступительные испытания.
          Школьникам, учащимся Московских школ, недоступно поступление в подразделение ЭМШ-онлайн. Они могут поступать
          только в основное подразделение ЭМШ. Но это не означает, что школьникам из Москвы будут доступны только очные
          курсы, они также смогут посещать онлайн и гибридные курсы.</p>
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
        {testsOnlineTeachers && (
          <aside style={{
            position: 'absolute',
            right: '2rem',
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '2rem 0',
          }}>
            <h3>Ответственные за онлайн вступительные испытания</h3>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '.3rem 0',
            }}>
              {testsOnlineTeachers.map((teacher) => (
                <li key={teacher.id} style={{
                  listStyleType: 'none',
                }}>
                  <p>{teacher.name}: <a href={`tel:${teacher.phone}`}>{teacher.phone}</a></p>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </section>

      <aside style={{
        position: 'absolute',
        top: '20%',
        left: '2rem',
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        gap: '2rem 0',
      }}>
        <h2>Регистрация на вступительные</h2>

        {statusRegistrationTests ?
          <div>
            <TestsRegistration/>
          </div> :
          <h3><span>Регистрация в данный момент закрыта</span></h3>
        }
      </aside>
    </article>
  );
};

export default EventsTests;