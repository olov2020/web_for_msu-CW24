import {useEffect, useState} from "react";
import {addPupil, deletePupil, getAllApplicants, getAllPupils, getAllTeachers} from "../../../api/adminApi.js";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import style from './listOfPeople.module.css';

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
            <h2 className={style.item}>ФИО</h2>
            <h2 className={style.item}>Добавлять новости</h2>
            <h2 className={style.item}>Добавлять курсы</h2>
            <h2 className={style.item}>Доступ ко всем ведомостям</h2>
            <h2 className={style.item}>Статус организатора</h2>
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

    </article>
  );
};

export default ListOfPeople;