import {useEffect, useState} from "react";
import {
  addPupil,
  addTeacher, deleteAuditoryAdmin,
  deleteCourseAdmin, deleteKNRAdmin, deleteLSHAdmin,
  deleteMarksAdmin,
  deleteNewsAdmin,
  deletePupil, deleteTeacher, deleteTestsOfflineAdmin, deleteTestsOnlineAdmin, deleteVSHAdmin,
  getAllPupils,
  getAllTeachers, makePupilRetired, recoverPupil, setAuditoryAdmin,
  setCourseAdmin,
  setKNRAdmin,
  setLSHAdmin,
  setMarksAdmin,
  setNewsAdmin,
  setTestsOfflineAdmin, setTestsOnlineAdmin,
  setVSHAdmin
} from "../../../api/adminApi.js";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import style from './listOfPeople.module.css';
import ToggleSwitch from "../../../generic/form/toggleSwitch/ToggleSwitch.jsx";
import checkMarkIcon from "../../../../public/generic/checkMarkIcon.svg";

const ListOfPeople = () => {

  const url = window.location.pathname;

  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      const data = url.includes('pupils') ?
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

  const makePupilRetiredFunc = async (pupilId) => {
    const data = await makePupilRetired({pupilId});
    if (data) {
      alert('Ученик успешно отчислен!');
    } else {
      alert('Упс, что-то пошло не так... Ученик не был отчислен');
    }
  }

  const recoverPupilFunc = async (pupilId) => {
    const data = await recoverPupil({pupilId});
    if (data) {
      alert('Ученик успешно восстановлен!');
    } else {
      alert('Упс, что-то пошло не так... Ученик не был восстановлен');
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

  const addAdminRole = async (userId, funcName) => {
    switch (funcName) {
      case 'setNewsAdmin':
        return await setNewsAdmin(userId);
      case 'setCourseAdmin':
        return await setCourseAdmin(userId);
      case 'setMarksAdmin':
        return await setMarksAdmin(userId);
      case 'setAuditoryAdmin':
        return await setAuditoryAdmin(userId);
      case 'setKNRAdmin':
        return await setKNRAdmin(userId);
      case 'setVSHAdmin':
        return await setVSHAdmin(userId);
      case 'setLSHAdmin':
        return await setLSHAdmin(userId);
      case 'setTestsOfflineAdmin':
        return await setTestsOfflineAdmin(userId);
      case 'setTestsOnlineAdmin':
        return await setTestsOnlineAdmin(userId);
      default:
        return Promise.reject(new Error('Invalid function name'));
    }
  }

  const deleteAdminRole = async (userId, funcName) => {
    switch (funcName) {
      case 'deleteNewsAdmin':
        return await deleteNewsAdmin(userId);
      case 'deleteCourseAdmin':
        return await deleteCourseAdmin(userId);
      case 'deleteMarksAdmin':
        return await deleteMarksAdmin(userId);
      case 'deleteAuditoryAdmin':
        return await deleteAuditoryAdmin(userId);
      case 'deleteKNRAdmin':
        return await deleteKNRAdmin(userId);
      case 'deleteVSHAdmin':
        return await deleteVSHAdmin(userId);
      case 'deleteLSHAdmin':
        return await deleteLSHAdmin(userId);
      case 'deleteTestsOfflineAdmin':
        return await deleteTestsOfflineAdmin(userId);
      case 'deleteTestsOnlineAdmin':
        return await deleteTestsOnlineAdmin(userId);
      default:
        return Promise.reject(new Error('Invalid function name'));
    }
  }

  return (
    <article>
      {url.includes('pupils') ?
        <h1>Список учеников</h1> :
        url.includes('teachers') ?
          <h1>Список преподавателей</h1> :
          null
      }

      {url.includes('pupils') && (
        <section className={style.section}>
          <div className={style.container}>
            <h2 className={style.item}>ФИО</h2>
            <h2 className={style.item}>Класс</h2>
            <h2 className={style.item}>Статус</h2>
            <h2 className={style.item}>Статус ученика</h2>
          </div>

          {people.map((person) => (
            <div key={person.id} className={style.container}>
              <h3 className={style.item}>{person.name}</h3>
              <p className={style.item}>{person.grade}</p>
              {!person.authorized ?

                <h3 className={style.item}><span>Ожидает действие</span></h3> :
                <h3 className={style.item}><span>{person.status}</span></h3>
              }
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '25%',
                gap: '0 1rem',
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
                }
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
              width: '10%',
            }}>Почта</h2>
            <div className={style.itemTeacher} style={{
              width: '25%',
            }}>
              <h2>Функциональная роль</h2>

              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
              }}>
                <p>Добавление новостей</p>
                <p>Добавление курсов</p>
                <p>Просмотр ведомостей</p>
                <p>Назначение аудиторий</p>
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
            }}>Статус преподавателя</h2>
          </div>

          {people.map((person) => (
            <div key={person.id} className={style.container}>
              <h3 className={style.itemTeacher} style={{
                width: '15%',
              }}>{person.name}</h3>
              <p className={style.itemTeacher} style={{
                width: '10%',
              }}><a href={`mailto:${person.email}`}>{person.email}</a></p>
              <div className={style.itemTeacher} style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '25%',
              }}>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setNewsAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteNewsAdmin')}/>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setCourseAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteCourseAdmin')}/>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setMarksAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteMarksAdmin')}/>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setAuditoryAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteAuditoryAdmin')}/>
              </div>
              <div className={style.itemTeacher} style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '30%',
              }}>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setKNRAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteKNRAdmin')}/>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setVSHAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteVSHAdmin')}/>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setLSHAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteLSHAdmin')}/>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setTestsOfflineAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteTestsOfflineAdmin')}/>
                <ToggleSwitch funcOn={async () => await addAdminRole(person.id, 'setTestsOnlineAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteTestsOnlineAdmin')}/>
              </div>
              <div className={style.itemTeacher} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '20%',
                gap: '0 1rem',
              }}>
                {!person.authorized ?
                  <>
                    <ButtonSubmit text='Добавить' onClick={() => {
                      addTeacherFunc(person.id)
                    }}/>
                    <ButtonSubmit text='Удалить' type='delete' onClick={() => {
                      deleteTeacherFunc(person.id)
                    }}/>
                  </> :
                  <>
                    <h3>Преподаватель добавлен</h3>
                    <img src={checkMarkIcon} alt='Добавлен' style={{
                      width: '2rem',
                      objectFit: 'contain',
                    }}/>
                  </>
                }
              </div>
            </div>
          ))}
        </section>
      )}

    </article>
  );
};

export default ListOfPeople;