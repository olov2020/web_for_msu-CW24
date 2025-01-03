import styleEvents from '../events.module.css';
import {useEffect, useState} from "react";
import {getEventsSummerCampTeachers} from "../../../api/eventsApi.js";
import ContactsSection from "../contactsSection/ContactsSection.jsx";

const SummerCamp = () => {

  const [teachers, setTeachers] = useState([
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
    {id: 0, name: 'Asdadads asdkjalskdj alskdalskd', phone: '+79888800884'},
  ]);

  useEffect(() => {
    const getEventsSummerCampTeachersFunc = async () => {
      const data = await getEventsSummerCampTeachers();
      setTeachers(data);
    }

    getEventsSummerCampTeachersFunc();
  }, []);

  return (
    <article>
      <h1>Летний лагерь ЭФ МГУ</h1>

      <section className={styleEvents.section}>
        <p><strong>Летний лагерь</strong> – это онлайн-занятия, которые стали результатом совместной работы ЭМШ и
          экономического факультета МГУ.
          Программа включает занятия по трем направлениям: <strong>Экономика, Математика и Третий путь</strong>. <a
            href='https://emsch.timepad.ru/event/2925846/'>Регистрация</a> и участие в Летнем лагере
          совершенно <strong>бесплатны</strong>.</p>

        <p>Занятия можно посетить блоком, то есть прийти на все лекции и семинары направления, или выбрать отдельные
          занятия по темам, которые вас заинтересуют. Подробнее о требованиях к подготовке слушателей вы сможете узнать
          из программы Летнего лагеря и анонсов занятий в <a href='https://t.me/summermsu'>телеграм-канале</a> и в
          группе <a href='https://vk.com/emsch'>Вконтакте</a>.</p>
        <p>Мы ждем школьников, перешедших в 8-11 классы. Учащиеся более младших классов могут посетить отдельные лекции
          по Экономике и Третьему пути, однако в таком случае мы не можем гарантировать полное погружение участника в
          тему из-за сложности программы. Программа по математике рассчитана строго на 8-9 и 10-11 классы.</p>
        <p>Для участия необходима только программа <a href='https://www.zoom.com/ru'>Zoom</a>. Зарегистрироваться
          можно <a href='https://emsch.timepad.ru/event/2925846/'>тут</a></p>
        <p>Мы докажем вам, что учиться летом — это весело и интересно, ведь учеба — это не только школьные уроки. До
          встречи на Летнем лагере!</p>

        <aside className={styleEvents.asideRight}>
          {teachers && (
            <ContactsSection header='Ответственные за Летний лагерь' teachers={teachers}/>
          )}
        </aside>
      </section>
    </article>
  );
};

export default SummerCamp;