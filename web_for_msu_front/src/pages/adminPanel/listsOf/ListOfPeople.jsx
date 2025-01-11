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

  const [updateList, setUpdateList] = useState(false);
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
  }, [updateList]);

  const addPupilFunc = async (pupilId) => {
    const data = await addPupil({pupilId});
    if (data) {
      alert('Ученик успешно добавлен!');
      setUpdateList(!updateList);
    } else {
      alert('Упс, что-то пошло не так... Ученик не был добавлен');
    }
  }

  const deletePupilFunc = async (pupilId) => {
    const data = await deletePupil({pupilId});
    if (data) {
      alert('Ученик успешно исключен!');
      setUpdateList(!updateList);
    } else {
      alert('Упс, что-то пошло не так... Ученик не был исключен');
    }
  }

  const makePupilRetiredFunc = async (pupilId) => {
    const data = await makePupilRetired({pupilId});
    if (data) {
      alert('Ученик успешно отчислен!');
      setUpdateList(!updateList);
    } else {
      alert('Упс, что-то пошло не так... Ученик не был отчислен');
    }
  }

  const recoverPupilFunc = async (pupilId) => {
    const data = await recoverPupil({pupilId});
    if (data) {
      alert('Ученик успешно восстановлен!');
      setUpdateList(!updateList);
    } else {
      alert('Упс, что-то пошло не так... Ученик не был восстановлен');
    }
  }

  const addTeacherFunc = async (teacherId) => {
    const data = await addTeacher({teacherId});
    if (data) {
      alert('Преподаватель успешно добавлен!');
      setUpdateList(!updateList);
    } else {
      alert('Упс, что-то пошло не так... Преподаватель не был добавлен');
    }
  }

  const deleteTeacherFunc = async (teacherId) => {
    const data = await deleteTeacher({teacherId});
    if (data) {
      alert('Преподаватель успешно исключен!');
      setUpdateList(!updateList);
    } else {
      alert('Упс, что-то пошло не так... Преподаватель не был исключен');
    }
  }

  const addAdminRole = async (userId, funcName) => {
    switch (funcName) {
      case 'setNewsAdmin': {
        const data = await setNewsAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setCourseAdmin': {
        const data = await setCourseAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setMarksAdmin': {
        const data = await setMarksAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setAuditoryAdmin': {
        const data = await setAuditoryAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setKNRAdmin': {
        const data = await setKNRAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setVSHAdmin': {
        const data = await setVSHAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setLSHAdmin': {
        const data = await setLSHAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setTestsOfflineAdmin': {
        const data = await setTestsOfflineAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'setTestsOnlineAdmin': {
        const data = await setTestsOnlineAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      default:
        return Promise.reject(new Error('Invalid function name'));
    }
  }

  const deleteAdminRole = async (userId, funcName) => {
    switch (funcName) {
      case 'deleteNewsAdmin': {
        const data = await deleteNewsAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteCourseAdmin': {
        const data = await deleteCourseAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteMarksAdmin': {
        const data = await deleteMarksAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteAuditoryAdmin': {
        const data = await deleteAuditoryAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteKNRAdmin': {
        const data = await deleteKNRAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteVSHAdmin': {
        const data = await deleteVSHAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteLSHAdmin': {
        const data = await deleteLSHAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteTestsOfflineAdmin': {
        const data = await deleteTestsOfflineAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
      case 'deleteTestsOnlineAdmin': {
        const data = await deleteTestsOnlineAdmin(userId);
        if (data) {
          setUpdateList(!updateList);
        }
        return;
      }
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
                <ToggleSwitch value={person.roles.includes('newsmaker')}
                              funcOn={async () => await addAdminRole(person.id, 'setNewsAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteNewsAdmin')}/>
                <ToggleSwitch value={person.roles.includes('coursemaker')}
                              funcOn={async () => await addAdminRole(person.id, 'setCourseAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteCourseAdmin')}/>
                <ToggleSwitch value={person.roles.includes('marksmaker')}
                              funcOn={async () => await addAdminRole(person.id, 'setMarksAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteMarksAdmin')}/>
                <ToggleSwitch value={person.roles.includes('auditorymaker')}
                              funcOn={async () => await addAdminRole(person.id, 'setAuditoryAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteAuditoryAdmin')}/>
              </div>
              <div className={style.itemTeacher} style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '30%',
              }}>
                <ToggleSwitch value={person.roles.includes('knr')}
                              funcOn={async () => await addAdminRole(person.id, 'setKNRAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteKNRAdmin')}/>
                <ToggleSwitch value={person.roles.includes('vsh')}
                              funcOn={async () => await addAdminRole(person.id, 'setVSHAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteVSHAdmin')}/>
                <ToggleSwitch value={person.roles.includes('lsh')}
                              funcOn={async () => await addAdminRole(person.id, 'setLSHAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteLSHAdmin')}/>
                <ToggleSwitch value={person.roles.includes('tests_offline')}
                              funcOn={async () => await addAdminRole(person.id, 'setTestsOfflineAdmin')}
                              funcOff={async () => await deleteAdminRole(person.id, 'deleteTestsOfflineAdmin')}/>
                <ToggleSwitch value={person.roles.includes('tests_online')}
                              funcOn={async () => await addAdminRole(person.id, 'setTestsOnlineAdmin')}
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