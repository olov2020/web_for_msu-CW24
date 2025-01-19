import {useEffect, useState} from "react";
import {getDirectoryTeachers} from "../../api/userApi.js";

const Teachers = () => {

  const [teachers, setTeachers] = useState({});

  const teachersList = Object.entries(teachers);

  const titles = ['Совет', 'Дирекция', 'Организаторы', 'Преподаватели'];

  useEffect(() => {
    const getAllTeachersFunc = async () => {
      const data = await getDirectoryTeachers();
      setTeachers(data);
    }

    getAllTeachersFunc();
  }, []);

  return (
    <article>
      <h1>Преподаватели и дирекция ЭМШ</h1>

      {teachersList.map((teacherGroup, index) => (
        <section key={index} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
        }}>
          <h2 style={{
            textAlign: 'center',
            marginTop: '5rem',
            marginBottom: '1rem',
          }}>{titles[index]}</h2>
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '1rem 0',
          }}>
            {teacherGroup[1].map((teacher, teacherIndex) => (
              <li key={teacherIndex} style={{
                listStyle: 'none',
                display: 'flex',
                width: 'auto',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0 2rem',
                paddingBottom: '.5rem',
                borderBottom: '1px dotted #9F1A59',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 'auto',
                  gap: '.5rem 0',
                }}>
                <h3>{teacher.name}</h3>

                {teacher.email &&
                  <p><a href={`mailto:${teacher.email}`}>{teacher.email}</a></p>
                }
                </div>

                {teacher.subjects &&
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 'auto',
                  }}>
                    {teacher.subjects}
                  </div>
                }

                {teacher.what &&
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 'auto',
                  }}>
                    {teacher.what}
                  </div>
                }
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h1 style={{
        marginTop: '5rem',
      }}>Контакты</h1>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
      }}>
        <p>Адрес: Москва, Воробьевы горы, III Гуманитарный корпус МГУ имени М.В.Ломоносова, Экономический факультет,
          комната 364, ЭМШ</p>
        <p>Телефон: <a href='tel:84959391606'>+7(495) 939-16-06</a></p>

        <h2 style={{
          marginTop: '2rem',
        }}>Все почты:</h2>
        <ul>
          <li><p>ЭМШ - <a href='mailto:info@emsch.ru'>info@emsch.ru</a></p></li>
          <li><p>Совет ЭМШ - <a href='mailto:sovet@emsch.ru'>sovet@emsch.ru</a></p></li>
          <li><p>Ответственный за Базу ЭМШ - <a href='mailto:study@emsch.ru'>study@emsch.ru</a></p></li>
          <li><p>Ответственный за пропуска - <a href='mailto:propusk@emsch.ru'>propusk@emsch.ru</a></p></li>
          <li><p>Ответственный за сувенирную продукцию - <a href='mailto:souvenir@emsch.ru'>souvenir@emsch.ru</a></p>
          </li>
          <li><p>Организаторы вступительных испытаний - <a href='mailto:apply@emsch.ru'>apply@emsch.ru</a></p></li>
          <li><p>Организаторы Открытого чемпионата - <a href='mailto:olimpiada@emsch.ru'>olimpiada@emsch.ru</a></p></li>
          <li><p>Организаторы КНР - <a href='mailto:knr@emsch.ru'>knr@emsch.ru</a></p></li>
          <li><p>Организаторы Выездной школы ЭМШ - <a href='mailto:vsh@emsch.ru'>vsh@emsch.ru</a></p></li>
          <li><p>Организаторы Летней школы ЭМШ - <a href='mailto:lsh@emsch.ru'>lsh@emsch.ru</a></p></li>
          <li><p>По вопросам онлайн обучения - <a href='mailto:online@emsch.ru'>online@emsch.ru</a></p></li>
        </ul>
      </section>
    </article>
  );
};

export default Teachers;