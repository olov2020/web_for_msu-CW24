import {useEffect, useState} from "react";
import {
  addPupil,
  addTeacher, deleteAuditoryAdmin,
  deleteCourseAdmin, deleteDirectoryTeacher, deleteKNRAdmin, deleteLSHAdmin,
  deleteMarksAdmin,
  deleteNewsAdmin,
  deletePupil, deleteSovetTeacher, deleteTeacher, deleteTestsOfflineAdmin, deleteTestsOnlineAdmin, deleteVSHAdmin,
  getAllPupils,
  getAllTeachers, makePupilRetired, recoverPupil, setAuditoryAdmin,
  setCourseAdmin, setDirectoryTeacher,
  setKNRAdmin,
  setLSHAdmin,
  setMarksAdmin,
  setNewsAdmin, setSovetTeacher,
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
    case 'setDirectoryTeacher':
      return await setDirectoryTeacher(userId);
    case 'setSovetTeacher':
      return await setSovetTeacher(userId);
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
    case 'deleteDirectoryTeacher':
      return await deleteDirectoryTeacher(userId);
    case 'deleteSovetTeacher':
      return await deleteSovetTeacher(userId);
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
        <section className={style.sectionPupils}>
          <div className={style.container}>
            <h2 className={style.item}>ФИО</h2>
            <h2 className={style.item}>Почта</h2>
            <h2 className={style.item}>Класс</h2>
            <h2 className={style.item}>Статус</h2>
            <h2 className={style.item}>Статус ученика</h2>
          </div>

          {people.map((person) => (
            <div key={person.id} className={style.container}>
              <h3 className={style.item}>{person.name}</h3>
              <p className={style.item}><a href={`mailto:${person.email}`}>{person.email}</a></p>
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

          <section className={style.roles}>
            <section className={style.admins}>
              <h2>Функциональная роль</h2>

              <div className={style.rolesSection}>
                <p>Добавление новостей</p>
                <p>Добавление курсов</p>
                <p>Просмотр ведомостей</p>
                <p>Назначение аудиторий</p>
              </div>

              <div className={style.toggleSwitchSection}>
                {people.map((person) => (
                  person.authorized ?
                    <div key={person.id} className={style.switches}>
                      <ToggleSwitch value={person.roles.includes('newsmaker')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setNewsAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteNewsAdmin')}/>
                      <ToggleSwitch value={person.roles.includes('coursemaker')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setCourseAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteCourseAdmin')}/>
                      <ToggleSwitch value={person.roles.includes('marksmaker')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setMarksAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteMarksAdmin')}/>
                      <ToggleSwitch value={person.roles.includes('auditorymaker')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setAuditoryAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteAuditoryAdmin')}/>
                    </div> :
                    <h3 key={person.id}>Нет доступных действий</h3>
                ))}
              </div>
            </section>

            <section className={style.organisators}>
              <h2>Статус организатора</h2>

              <div className={style.rolesSection}>
                <p>Конкурс научных работ</p>
                <p>Выездная школа</p>
                <p>Летняя школа</p>
                <p>Вступительные очные</p>
                <p>Вступительные онлайн</p>
              </div>


              <div className={style.toggleSwitchSection}>
                {people.map((person) => (
                  person.authorized ?
                    <div key={person.id} className={style.switches}>
                      <ToggleSwitch value={person.roles.includes('knr')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setKNRAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteKNRAdmin')}/>
                      <ToggleSwitch value={person.roles.includes('vsh')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setVSHAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteVSHAdmin')}/>
                      <ToggleSwitch value={person.roles.includes('lsh')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setLSHAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteLSHAdmin')}/>
                      <ToggleSwitch value={person.roles.includes('tests_offline')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setTestsOfflineAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteTestsOfflineAdmin')}/>
                      <ToggleSwitch value={person.roles.includes('tests_online')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setTestsOnlineAdmin')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteTestsOnlineAdmin')}/>
                    </div> :
                    <h3 key={person.id}>Нет доступных действий</h3>
                ))}
              </div>
            </section>

            <section className={style.emschRoles}>
              <h2>Статус в ЭМШ</h2>

              <div className={style.rolesSection}>
                <p>Дирекция</p>
                <p>Совет</p>
              </div>


              <div className={style.toggleSwitchSection}>
                {people.map((person) => (
                  person.authorized ?
                    <div key={person.id} className={style.switches}>
                      <ToggleSwitch value={person.roles.includes('directory')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setDirectoryTeacher')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteDirectoryTeacher')}/>
                      <ToggleSwitch value={person.roles.includes('sover')}
                                    onClick={() => setUpdateList(!updateList)}
                                    funcOn={async () => await addAdminRole(person.id, 'setSovetTeacher')}
                                    funcOff={async () => await deleteAdminRole(person.id, 'deleteSovetTeacher')}/>
                    </div> :
                    <h3 key={person.id}>Нет доступных действий</h3>
                ))}
              </div>
            </section>
          </section>

          <section className={style.actions}>
            <h2>Статус преподавателя</h2>

            {people.map((person) => (
              <div key={person.id} style={{
                display: 'flex',
                gap: '0 1rem',
                alignItems: 'center',
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
            ))}
          </section>
        </section>
      )}

    </article>
  );
};

export default ListOfPeople;