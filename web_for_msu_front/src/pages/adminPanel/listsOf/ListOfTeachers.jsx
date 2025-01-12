import style from "./listOfPeople.module.css";
import ToggleSwitch from "../../../generic/form/toggleSwitch/ToggleSwitch.jsx";
import ButtonSubmit from "../../../generic/form/submit/ButtonSubmit.jsx";
import checkMarkIcon from "../../../../public/generic/checkMarkIcon.svg";

// eslint-disable-next-line react/prop-types
const ListOfTeachers = ({people}) => {



  return (
    <section className={style.section}>
      <section className={style.teachers}>
        <h2>ФИО</h2>
        {/* eslint-disable-next-line react/prop-types */}
        {people.map((person) => (
          <h3 key={person.id}>{person.name}</h3>
        ))}
      </section>

      <section className={style.email}>
        <h2>Почта</h2>
        {/* eslint-disable-next-line react/prop-types */}
        {people.map((person) => (
          <p key={person.id}><a href={`mailto:${person.email}`}>{person.email}</a></p>
        ))}
      </section>

      <section className={style.roles}>
        <section className={style.admins}>
          <div className={style.itemTeacher}>
            <h2>Функциональная роль</h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              whiteSpace: 'nowrap',
            }}>
              <p className={style.itemTeacher}>Добавление новостей</p>
              <p className={style.itemTeacher}>Добавление курсов</p>
              <p className={style.itemTeacher}>Просмотр ведомостей</p>
              <p className={style.itemTeacher}>Назначение аудиторий</p>
            </div>
          </div>

          <div className={style.itemTeacher} style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '25%',
          }}>
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
          </div>
        </section>

        <section className={style.organisators}>
          <div className={style.itemTeacher}>
            <h2>Статус организатора</h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              whiteSpace: 'nowrap',
            }}>
              <p className={style.itemTeacher}>Конкурс научных работ</p>
              <p className={style.itemTeacher}>Выездная школа</p>
              <p className={style.itemTeacher}>Летняя школа</p>
              <p className={style.itemTeacher}>Вступительные очные</p>
              <p className={style.itemTeacher}>Вступительные онлайн</p>
            </div>
          </div>

          <div className={style.itemTeacher} style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '30%',
          }}>
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
          </div>
        </section>

        <section className={style.emschRoles}>
          <div className={style.itemTeacher}>
            <h2>Статус в ЭМШ</h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              whiteSpace: 'nowrap',
            }}>
              <p className={style.itemTeacher}>Дирекция</p>
              <p className={style.itemTeacher}>Совет</p>
            </div>
          </div>

          <ToggleSwitch value={person.roles.includes('tests_offline')}
                        onClick={() => setUpdateList(!updateList)}
                        funcOn={async () => await addAdminRole(person.id, 'setTestsOfflineAdmin')}
                        funcOff={async () => await deleteAdminRole(person.id, 'deleteTestsOfflineAdmin')}/>
          <ToggleSwitch value={person.roles.includes('tests_online')}
                        onClick={() => setUpdateList(!updateList)}
                        funcOn={async () => await addAdminRole(person.id, 'setTestsOnlineAdmin')}
                        funcOff={async () => await deleteAdminRole(person.id, 'deleteTestsOnlineAdmin')}/>
        </section>
      </section>

      <section className={style.actions}>

        <h2>Статус преподавателя</h2>
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
      </section>
    </section>
  );
};

export default ListOfTeachers;