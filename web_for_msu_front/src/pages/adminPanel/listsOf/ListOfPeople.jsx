import {useEffect, useState} from "react";
import {
  addPupil, addTeacher,
  deletePupil,
  deleteTeacher,
  getAllApplicants,
  getAllPupils,
  getAllTeachers
} from "../../../api/adminApi.js";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import style from './listOfPeople.module.css';
import ToggleSwitch from "../../../generic/form/toggleSwitch/ToggleSwitch.jsx";

const ListOfPeople = () => {

  const url = window.location.pathname;

  const [people, setPeople] = useState([
    {
      id: 0,
      name: 'Иванов Иван Иванович',
      email: 'ivan@mail.ru',
      class: 8,
      status: 'Ученик',
      date: '2024-11-10',
    },
    {
      id: 0,
      name: 'Иванов Иван Иванович',
      email: 'ivanivan@mail.ru',
      class: 11,
      status: 'Выпускник',
      date: '2024-11-10',
    },
    {
      id: 0,
      name: 'Иванов Иван Иванович',
      email: 'ivan@mail.ru',
      class: 8,
      status: 'Бывший ученик',
      date: '2024-11-10',
    },
  ]);

  useEffect(() => {
    const getPeople = async () => {
      const data = url.includes('applicants') ?
        await getAllApplicants() :
        url.includes('pupils') ?
          await getAllPupils() :
          url.includes('teachers') ?
            await getAllTeachers() :
            null;
      setPeople(data);
    }

    getPeople();
  }, [url]);

  const addPupilFunc = async (pupilId) => {
    const data = await addPupil({pupilId});
    if (data) {
      alert('Ученик успешно добавлен!');
    } else {
      alert('Упс, что-то пошло не так... Ученик не был добавлен');
    }
  }

  const deletePupilFunc = async (pupilId) => {
    const data = await deletePupil({pupilId});
    if (data) {
      alert('Ученик успешно исключен!');
    } else {
      alert('Упс, что-то пошло не так... Ученик не был исключен');
    }
  }

  const addTeacherFunc = async (teacherId) => {
    const data = await addTeacher({teacherId});
    if (data) {
      alert('Преподаватель успешно добавлен!');
    } else {
      alert('Упс, что-то пошло не так... Преподаватель не был добавлен');
    }
  }

  const deleteTeacherFunc = async (teacherId) => {
    const data = await deleteTeacher({teacherId});
    if (data) {
      alert('Преподаватель успешно исключен!');
    } else {
      alert('Упс, что-то пошло не так... Преподаватель не был исключен');
    }
  }

  return (
    <article>
      {url.includes('applicants') ?
        <h1>Список абитуриентов</h1> :
        url.includes('pupils') ?
          <h1>Список учеников</h1> :
          url.includes('teachers') ?
            <h1>Список преподавателей</h1> :
            null
      }

      {url.includes('applicants') && (
        <section className={style.section}>
          <div className={style.container}>
            <h2 className={style.item}>ФИО</h2>
            <h2 className={style.item}>Почта</h2>
            <h2 className={style.item}>Класс</h2>
            <h2 className={style.item}>Дата подачи заявки</h2>
          </div>

          {people.map((person) => (
            <div key={person.id} className={style.container}>
              <h3 className={style.item}>{person.name}</h3>
              <p className={style.item}>{person.email}</p>
              <h3 className={style.item}><span>{person.class}</span></h3>
              <p className={style.item}>{person.date}</p>
            </div>
          ))}
        </section>
      )}

      {url.includes('pupils') && (
        <section className={style.section}>
          <div className={style.container}>
            <h2 className={style.item}>ФИО</h2>
            <h2 className={style.item}>Класс</h2>
            <h2 className={style.item}>Статус</h2>
            <h2 className={style.item}>Действие</h2>
          </div>

          {people.map((person) => (
            <div key={person.id} className={style.container}>
              <h3 className={style.item}>{person.name}</h3>
              <p className={style.item}>{person.class}</p>
              <h3 className={style.item}><span>{person.status}</span></h3>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '25%',
                gap: '0 1rem',
              }}>
                <ButtonSubmit text='Добавить ученика' onClick={() => {addPupilFunc(person.id)}}/>
                <ButtonSubmit text='Удалить ученика' type='delete' onClick={() => {deletePupilFunc(person.id)}}/>
              </div>
            </div>
          ))}
        </section>
      )}

      {url.includes('teachers') && (
        <section className={style.section}>
          <div className={style.container}>
            <h2 className={style.itemTeacher} style={{
              width: '15%',
            }}>ФИО</h2>
            <h2 className={style.itemTeacher} style={{
              width: '15%',
            }}>Почта</h2>
            <div className={style.itemTeacher} style={{
              width: '20%',
            }}>
              <h2>Функциональная роль</h2>

              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                gap: '0 1rem',
              }}>
                <p>Добавление новостей</p>
                <p>Добавление курсов</p>
                <p>Просмотр ведомостей</p>
              </div>
            </div>
            <div className={style.itemTeacher} style={{
              width: '30%',
            }}>
              <h2>Статус организатора</h2>

              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                gap: '0 1rem',
              }}>
                <p className={style.itemTeacher}>Конкурс научных работ</p>
                <p className={style.itemTeacher}>Выездная школа</p>
                <p className={style.itemTeacher}>Летняя школа</p>
                <p className={style.itemTeacher}>Вступительные очные</p>
                <p className={style.itemTeacher}>Вступительные онлайн</p>
              </div>
            </div>
            <h2 className={style.itemTeacher} style={{
              width: '20%',
            }}>Действие</h2>
          </div>

          {people.map((person) => (
            <div key={person.id} className={style.container}>
              <h3 className={style.itemTeacher} style={{
                width: '15%',
              }}>{person.name}</h3>
              <p className={style.itemTeacher} style={{
                width: '15%',
              }}><span>{person.email}</span></p>
              <div className={style.itemTeacher} style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '20%',
                gap: '0 1rem',
              }}>
                <ToggleSwitch/>
                <ToggleSwitch/>
                <ToggleSwitch/>
              </div>
              <div className={style.itemTeacher} style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '30%',
                gap: '0 1rem',
              }}>
                <ToggleSwitch/>
                <ToggleSwitch/>
                <ToggleSwitch/>
                <ToggleSwitch/>
                <ToggleSwitch/>
              </div>
              <div className={style.itemTeacher} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
                gap: '0 1rem',
              }}>
                <ButtonSubmit text='Добавить учителя' onClick={() => {
                  addTeacherFunc(person.id)
                }}/>
                <ButtonSubmit text='Удалить учителя' type='delete' onClick={() => {
                  deleteTeacherFunc(person.id)
                }}/>
              </div>
            </div>
          ))}
        </section>
      )}

    </article>
  );
};

export default ListOfPeople;