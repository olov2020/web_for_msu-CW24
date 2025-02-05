import styleEvents from '../events.module.css';
import professorImg from '../../../../public/vsh/1.jpg';
import teachersImg from '../../../../public/vsh/2.jpg';
import juryImg from '../../../../public/vsh/3.jpg';
import winnersImg from '../../../../public/vsh/4.jpg';
import ContactsSection from "../contactsSection/ContactsSection.jsx";
import {useEffect, useState} from "react";
import {getEventsResidentialSchoolTeachers} from "../../../api/eventsApi.js";

const ResidentialSchool = () => {

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getEventsResidentialSchoolTeachersFunc = async () => {
      const data = await getEventsResidentialSchoolTeachers();
      setTeachers(data);
    }

    getEventsResidentialSchoolTeachersFunc();
  }, []);

  return (
    <article>
      <h1>Выездная Школа</h1>

      <section className={styleEvents.section}>
        <p>Выездная Школа (ВШ) – одно из самых значительных ежегодных мероприятий ЭМШ. Официальное название – Выездная
          учебно-научная конференция.</p>

        <p>В Выездной школе принимают участия порядка 300 человек, это:</p>
        <ul>
          <li><p>школьники ЭМШ, успешно выступившие в Конкурсе научных работ (всего 30 ребят, участие для которых
            является бесплатным);</p></li>
          <li><p>студенты-преподаватели ЭМШ (30 из которых также принимают участие в Выездной школе бесплатно, став
            победителями в Конкурсе тезисов (конкурс лекций); а 5 лучших по итогам Конкурса получают возможность
            прочитать свою лекцию наряду с приглашенными лекторами);</p></li>
          <li><p>старшие люди ЭМШ и приглашенные лекторы: ученые, преподаватели высших учебных заведений, ведущие
            специалисты в различных областях знаний. За последние несколько лет на конференции выступали такие известные
            ученые, как декан экономического факультета МГУ, д.э.н., проф. А.А. Аузан; профессор РЭШ, PhD in
            Mathematical Economics Ш. Вебер; зав. кафедры энергетических и сырьевых рынков факультета мировой экономики
            и мировой политики НИУ-ВШЭ, к.э.н. Л.М. Григорьев; профессор географического факультета МГУ, руководитель
            программы Независимого института социальной политики, д.геогр.н. Н.В. Зубаревич и многие другие.</p></li>
        </ul>

        <img src={professorImg} alt='Фото профессора с ВШ'/>

        <p>Обычно Выездная школа приходится на конец февраля, поэтому исторически также называется «Зимней», и длится 5
          дней. За это время все участники успевают прослушать более 30 лекций как по экономическим дисциплинам, так и
          по различным разделам математики и других наук. Кроме этого на ВШ проводятся круглые столы, во время которых
          обсуждаются актуальные проблемы. Стоит отметить, что на лекциях слушатели сидят не за партами в три ряда, а
          полукругом, что создает дружественную атмосферу обмена знаниями и опытом. Любой слушатель может задать вопрос
          лектору и принять участие в обсуждении в перерыве или после лекции.</p>

        <img src={teachersImg} alt='Фото преподавателей с ВШ'/>

        <p>Продолжением незабываемой атмосферы знаний и общения на Выездной школе являются внелекционные мероприятия,
          которые организуются на ВШ по вечерам. В рамках игр и конкурсов участники Школы не только знакомятся друг с
          другом, но и проводят время с пользой.Каждый вечер участников ждет новое событие: Игра-знакомство «Имени
          Ленки», КВН, экономическая игра Клондайк, «Что? Где? Когда?», «Своя игра».</p>

        <img src={juryImg} alt='Фото жюри с ВШ'/>

        <p>Помимо этого на Выездной каждый год проводятся вечера песен и стихов, где любой может поделится с окружающими
          своими любимыми произведениями.</p>

        <img src={winnersImg} alt='Фото победителей с ВШ'/>

        <aside className={`${styleEvents.aside} ${styleEvents.asideRight}`}>
          <h3>Контакты:</h3>
          <p style={{
            textAlign: 'left',
          }}>Почта для общих вопросов: <a href='mailto:vsh@emsch.ru'>vsh@emsch.ru</a></p>

          {teachers && (
              <ContactsSection header='Ответственные за Выездную школу' contacts={teachers}/>
          )}
        </aside>
      </section>
    </article>
  );
};

export default ResidentialSchool;