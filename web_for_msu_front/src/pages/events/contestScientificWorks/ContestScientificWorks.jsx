import styleEvents from '../events.module.css';
import {useEffect, useState} from "react";
import {
  getEventsContestScientificWorksDate,
  getEventsContestScientificWorksTeachers,
} from "../../../api/eventsApi.js";
import ContactsSection from "../contactsSection/ContactsSection.jsx";
import subjectObjectImg from '../../../../public/knr/1.jpg';
import diagram1 from '../../../../public/knr/2.jpg';
import {Link} from "react-router-dom";
import {EVENTS_RESIDENTIAL_SCHOOL_ROUTE} from "../../../routing/consts.js";
import Form from "../../../generic/form/Form.jsx";
import {useSelector} from "react-redux";

const ContestScientificWorks = () => {

  const authStatus = useSelector(state => state.user.authStatus);
  const [teachers, setTeachers] = useState([]);
  const [dates, setDates] = useState({});

  useEffect(() => {
    const getEventsContestScientificWorksTeachersFunc = async () => {
      const data = await getEventsContestScientificWorksTeachers();
      setTeachers(data);
    }

    getEventsContestScientificWorksTeachersFunc();

    const getEventsContestScientificWorksDateFunc = async () => {
      const data = await getEventsContestScientificWorksDate();
      setDates(data);
    }

    getEventsContestScientificWorksDateFunc();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const hintText = 'Тьюторы – это консультанты из состава преподавателей ЭМШ, к которым можно обратиться, если есть вопросы';

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <article>
      <h1>Конкурс научных работ</h1>

      <section className={styleEvents.section}>
        <p><a href='https://vk.com/knr_emsch'>Конкурс научных работ (КНР)</a> — ежегодное мероприятие, которое даёт
          возможность школьнику сформировать
          начальное представление о научной деятельности. На основании результатов КНР формируются списки школьников,
          рекомендованных к участию в <Link to={EVENTS_RESIDENTIAL_SCHOOL_ROUTE}>Выездной школе (ВШ)</Link>.</p>
        <p>КНР состоит из 3-х этапов:</p>
        <p>I тур — написание работы (последний срок сдачи работ в 2022 году уточняется).</p>
        <p><a href='#secondTour'>II тур</a> — подготовка презентации и публичного выступления, устная защита своей
          работы перед комиссией. Все
          участники I тура, работы которых соответствуют необходимым требованиям, попадают во II тур (дата защиты в 2022
          году уточняется).</p>
        <p><a href='#thirdTour'>III тур</a> — Научный семинар (дата проведения в 2022 году уточняется).</p>
        <p>По результатам двух туров КНР авторам лучших работ предлагается усовершенствовать свою работу с Научным
          руководителем либо попробовать свои силы в научном оппонировании.</p>
        <p>Для участия в I туре необходимо:</p>
        <p>1. Написать реферат или исследовательскую работу на любую интересующую тему (требования к каждому типу работ
          описаны в <a href='https://emsch.ru/wp-content/uploads/2021/02/Polozhenie_KNR_2020-21.pdf'>Положении о КНР
            2020/2021</a> и здесь).</p>
        <p>2. Прислать электронную версию на адрес <a href='mailto:referat@emsch.ru'>referat@emsch.ru</a>. В теме письма
          указать девиз работы.</p>
        <p>В рамках I тура проводятся мастер-классы по основным аспектам написания реферата и исследовательской работы.
          Также оказать помощь в подготовке к I туру могут <span onMouseOver={showModal}
                                                                 onMouseOut={hideModal}
                                                                 style={{
                                                                   cursor: 'pointer'
                                                                 }}
          >тьюторы</span>. Функции тьютора
          — помочь школьникам в выборе темы,
          формулировке целей, задач и других важных аспектов написания научной работы. Работа с тьютором осуществляется
          в формате очных или онлайн консультаций. Заявка на участие в консультации подаётся на электронный
          адрес <a href='mailto:tutor@emsch.ru'>tutor@emsch.ru</a> или в личном сообщении.</p>
        <p>С <strong>буклетом</strong> КНР можно ознакомиться <a
          href='https://emsch.ru/wp-content/uploads/2020/12/KNR_buklet.pdf'>тут</a>!</p>
        {isModalVisible && (
          <div style={{
            backgroundColor: '#F7B7CE',
            padding: '1rem',
            borderRadius: '.5rem',
            marginTop: '-4rem',
            width: 'max-content',
          }}>
            <p>{hintText}</p>
          </div>
        )}

        <aside className={`${styleEvents.asideRight} ${styleEvents.aside}`}>
          <h3>Важные даты:</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            {authStatus.includes('admin') ?
              <Form inputs={['dateKnrFirstEvents', 'dateKnrSecondEvents', 'dateKnrThirdEvents']}
                    values={{dateKnrFirstEvents: dates.date_first, dateKnrSecondEvents: dates.date_second, dateKnrThirdEvents: dates.date_third,}}
                    type='setDateContestScientificWorks'
                    buttonText='Сохранить даты'
              /> :
              <>
                <p>Дата I тура: <strong>{dates.date_first}</strong></p>
                <p>Дата II тура: <strong>{dates.date_second}</strong></p>
                <p>Дата III тура: <strong>{dates.date_third}</strong></p>
              </>
            }
          </div>
          <ContactsSection header='Ответственные за Конкурс научных работ' contacts={teachers}/>
        </aside>

        <aside className={`${styleEvents.asideLeft} ${styleEvents.aside}`}>
          <h2>Правила оформления</h2>

          <ol>
            <li><p>Формат текста: шрифт Times New Roman, Arial или Calibri, 12 размер, полуторный интервал, верхнее,
              левое
              и нижнее поля – отступ по 20 мм, правое – 10 мм.</p></li>
            <li><p>Текст должен быть разбит на главы и абзацы.</p></li>
            <li><p>Формат заголовков: шрифт Times New Roman, Arial или Calibri, 14 размер.</p></li>
            <li><p>На титульном листе должны быть указаны: название работы, девиз автора, тип работы, год, город, в
              котором написана работа, и пометка о том, что работа предназначается для конкурса в ЭМШ.</p></li>
            <li><p>В работе должны присутствовать сквозные сноски и нумерация страниц (кроме титульного листа).</p></li>
            <li><p>В начале работы должно быть размещено оглавление.</p></li>
            <li><p>В конце работы должен быть размещен список использованной автором литературы. В начале списка
              литературы указываются книги, затем журнальные статьи, в конце – интернет-источники. В рамках одного типа
              источников соблюдается алфавитный порядок.</p></li>
            <li><p>Работа не должна превышать объем в 20 страниц (включая титульный лист, оглавление, список
              использованной литературы). Не включаются в этот объем только приложения, то есть дополнительная
              информация,
              без которой работа все равно остается законченной и цельной. Превышение максимально допустимого объема
              работы штрафуется.</p></li>
          </ol>
        </aside>
      </section>

      <h1>Требования к работе</h1>

      <section className={styleEvents.section}>
        <p>Авторская работа на Конкурс научных работ принимается в двух форматах: реферат или исследовательская
          работа.</p>
        <h2 style={{
          textAlign: 'center'
        }}>Типы работ</h2>
        <p><strong>Реферат</strong> — это письменный доклад на определённую тему, в котором обобщается и анализируется
          информация из
          нескольких источников, формируется собственный взгляд автора на проблематику выбранной темы. Главной целью
          реферата является анализ существующих научных материалов по определённой теме, основным средством – работа с
          источниками. В заключении реферата автор должен чётко сформулировать своё мнение и сделать итоговые
          выводы.</p>
        <p><strong>Основные критерии оценки реферата</strong>: умение работать с источниками, логическая корректность,
          соответствие выводов поставленной проблеме реферата.</p>
        <p><strong>Исследовательская работа</strong> – это форма работы, связанная с решением исследовательской задачи и
          включающая определённые элементы:</p>

        <ol>
          <li>
            <p>Объект и предмет исследования:</p>
            <ul>
              <li><p>Объект исследования – часть научного знания, с которой работает автор;</p></li>
              <li><p>Предмет исследования – конкретная область проблематики работы.</p></li>
            </ul>
          </li>
          <li><p>Тема и актуальность исследования.</p></li>
          <li><p>Определение гипотезы — предположение автора, проверяемое в ходе исследования.</p></li>
          <li>
            <p>Цель и задачи исследования:</p>
            <ul>
              <li><p>Цель – то, что нужно достичь в результате работы;</p></li>
              <li><p>Задачи – конкретные задания, выполняемые поэтапно, необходимые для достижения цели.</p></li>
            </ul>
          </li>

        </ol>

        <aside className={`${styleEvents.asideRight} ${styleEvents.aside}`} style={{
          border: 'none',
        }}>
          <img src={subjectObjectImg} alt='Предмет входит в объект'/>
        </aside>

        <p><strong>Основные критерии оценки исследовательской работы</strong>: логика этапов анализа и работа с
          гипотезой, результативность исследования.</p>

        <img src={diagram1} alt='Критерии оценки работ'/>
      </section>

      <h1>Штрафы и санкции</h1>

      <section className={styleEvents.section}>
        <p><strong>Снимается с конкурса:</strong></p>
        <ol>
          <li><p>Работа, в которой нарушены правила анонимности (где-либо в работе упоминается имя автора или название
            знает кто-либо из преподавателей ЭМШ, за исключением тьюторов и Организаторов).</p></li>
          <li><p>Работа, содержащая более 20% плагиата.</p></li>
          <li><p>Работа, содержащая более 50% цитат (если для раскрытия заявленной темы не является необходимым обширное
            цитирование, например, работа затрагивает анализ чьего-либо творчества).</p></li>
          <li><p>Работа, содержащая экстремистские или оскорбительные высказывания в части авторского текста.</p></li>
          <li><p>Работа, содержащая нецензурную лексику (включая название и девиз).</p></li>
          <li><p>Работа, написанная на иностранном языке.</p></li>
        </ol>

        <p style={{
          marginTop: '1rem',
        }}><strong>Штрафуется:</strong></p>
        <ol>
          <li><p>Работа, содержащая более 5% плагиата.</p></li>
          <li><p>Работа, содержащая более 30% цитат.</p></li>
          <li><p>Работа, в которой не соблюдены правила цитирования, а именно: есть кавычки, но нет ссылки; или есть
            ссылка, но нет кавычек, а также цитаты на иностранном языке без перевода; а также неверно оформлены
            определения.</p></li>
          <li><p>Работа, содержащая нецензурную лексику в цитатах.</p></li>
        </ol>
      </section>

      <section className={styleEvents.section} id='secondTour'>
        <h2>Второй тур</h2>
        <p>По окончании I тура Конкурса все его участники переходят во II тур, в котором авторам предоставляется
          возможность защитить свою работу.</p>
        <ol>
          <li><p>Защита работы проходит в форме устного выступления школьника перед комиссией.</p></li>
          <li><p>Регламент (продолжительность) выступления — не более 10 минут.</p></li>
          <li><p>Школьник должен представить свою работу, используя мультимедийную презентацию либо любой другой
            наглядный материал.</p></li>
          <li><p>По завершении выступления комиссия задает школьнику свои вопросы. Регламент (продолжительность) времени
            ответов на вопросы – не более 10 минут.</p></li>
          <li><p>Во время ответа на вопросы школьник может при необходимости обращаться к презентации, тексту доклада
            или работы.</p></li>
        </ol>

        <p><strong>Правила оформления презентации:</strong></p>
        <ol>
          <li><p>Презентация предназначена для наглядного представления основных идей работы школьника. Ее структура
            должна соответствовать общей логике выступления.</p></li>
          <li><p>Презентация должна быть оформлена в соответствии с содержанием работы и включать в себя только те
            объекты (иллюстрации, графики, таблицы, элементы анимации и т.д.), которые действительно необходимы для
            раскрытия тезисов.</p></li>
        </ol>
      </section>

      <section className={styleEvents.section} id='thirdTour'>
        <h2>Научный семинар</h2>
        <p>Научный семинар (НС) – круглый стол с экспертами, который позволяет участникам выявить сильные и слабые
          стороны проделанной научной работы. Подготовка к Научному семинару представляет собой доведение до
          университетского уровня лучших работ по результатам Конкурса научных работ (КНР). Кроме того, участие в НС
          даёт возможность получить опыт написания настоящей исследовательской работы, бесценный для будущего студента,
          а также полезные навыки научного оппонирования.</p>
        <p>На Научный семинар приглашаются школьники, набравшие наибольшее количество баллов по результатам I и II
          туров; формируется не более 5 пар Докладчик-Оппонент. Все участники НС имеют уникальный шанс презентовать свои
          работы на встрече с Экспертами, выявить их сильные и слабые стороны, поучаствовать в дискуссии, получить
          ценные советы от профессионалов.</p>
        <p>Оппонирование предоставляет возможность школьникам проанализировать научные работы коллег, освоить аспекты
          критического анализа, а также научиться писать рецензии.</p>
        <p>Докладчику для участия в Научном семинаре необходимо представить свою работу в формате научного исследования.
          Если участник в КНР презентовал реферат, то проведённую аналитическую работу необходимо перевести в
          исследовательский формат.</p>
        <p>В рамках НС Докладчики и Оппоненты выбирают себе Научных руководителей (наставников из старших
          преподавателей), которые в индивидуальном порядке помогают проработать слабые стороны исследования и
          усовершенствовать работу автора во всех аспектах или же объясняют основные цели и задачи оппонирования.</p>
        <p>Не упусти свой шанс подготовиться к университетской научной работе и попробовать себя в роли настоящего
          исследователя или оппонента! Все новости Научного семинара можно найти в <a href='https://vk.com/knr_emsch'>официальной
            группе КНР ВКонтакте</a>.</p>
      </section>
    </article>
  );
};

export default ContestScientificWorks;