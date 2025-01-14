import React from 'react';
import style from "./listOfPeople.module.css";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import checkMarkIcon from "../../../../public/generic/checkMarkIcon.svg";

const ListOfPupils = () => {
  return (
    <section className={style.sectionTeachers}>
      <section className={style.teachers}>
        <h2>ФИО</h2>
        {people.map((person) => (
          <h3 key={person.id}>{person.name}</h3>
        ))}
      </section>

      <section className={style.email}>
        <h2>Почта</h2>
        {people.map((person) => (
          <h3 key={person.id}><a href={`mailto:${person.email}`}>{person.email}</a></h3>
        ))}
      </section>

      <section className={style.grade}>
        <h2>Класс</h2>
        {people.map((person) => (
          <h3 key={person.id}>{person.grade}</h3>
        ))}
      </section>

      <section className={style.status}>
        <h2>Статус</h2>
        {people.map((person) => (
          <h3 key={person.id}>{person.status}</h3>
        ))}
      </section>

      <section className={style.actions}>
        <h2>Статус ученика</h2>

        {people.map((person) => (
          <div key={person.id} style={{
            display: 'flex',
            gap: '0 1rem',
            alignItems: 'center',
          }}>
            {!person.authorized ?
              <>
                <ButtonSubmit text='Добавить' onClick={() => {
                  addPupilFunc(person.id)
                }}/>
                <ButtonSubmit text='Удалить' type='delete' onClick={() => {
                  deletePupilFunc(person.id)
                }}/>
              </> :
              <>
                person.status === 'Ученик' ?
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: '0 1rem',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                    gap: '0 .5rem',
                  }}>
                    <h3>Ученик добавлен</h3>
                    <img src={checkMarkIcon} alt='Добавлен' style={{
                      width: '2rem',
                      objectFit: 'contain',
                    }}/>
                  </div>
                  <ButtonSubmit text='Отчислить' type='delete' onClick={() => {
                    makePupilRetiredFunc(person.id)
                  }}
                                style={{
                                  width: '50%',
                                }}
                  />
                </div> :
                person.status === 'Бывший ученик' ?
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: '0 1rem',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                    <h3>Ученик отчислен</h3>
                  </div>
                  <ButtonSubmit text='Восстановить' type='submit' onClick={() => {
                    recoverPupilFunc(person.id)
                  }}
                                style={{
                                  width: '50%',
                                }}
                  />
                </div> :
                <h3>Никаких действий нет</h3>
              </>
            }
          </div>
        ))}
      </section>
    </section>
  );
};

export default ListOfPupils;