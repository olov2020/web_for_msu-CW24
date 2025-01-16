import style from './form.module.css'
import InputEmail from "./inputs/userInputs/InputEmail.jsx";
import InputPassword from "./inputs/userInputs/InputPassword.jsx";
import ButtonSubmit from "./submit/ButtonSubmit.jsx";
import {
  changePassword,
  pupilChangeData, pupilRegistration, teacherChangeData, teacherRegistration, userLogin
} from "../../api/userApi.js";
import InputFile from "./inputs/userInputs/InputFile.jsx";
import InputName from "./inputs/userInputs/InputName.jsx";
import InputDate from "./inputs/userInputs/InputDate.jsx";
import InputPhone from "./inputs/userInputs/InputPhone.jsx";
import InputText from "./inputs/userInputs/InputText.jsx";
import InputYear from "./inputs/userInputs/InputYear.jsx";
import InputMessenger from "./inputs/userInputs/InputMessenger.jsx";
import InputDropdown from "./inputs/userInputs/InputDropdown.jsx";
import InputCheckbox from "./inputs/userInputs/InputCheckbox.jsx";
import {useEffect, useState} from "react";
import InputPhoto from "./inputs/userInputs/InputPhoto.jsx";
import InputNewsTitle from "./inputs/newsInputs/InputNewsTitle.jsx";
import {addNewsItem} from "../../api/newsApi.js";
import InputNewsDescription from "./inputs/newsInputs/InputNewsDescription.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {ALL_COURSES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, NEWS_ROUTE} from "../../routing/consts.js";
import {
  courseAdd,
  courseChange,
  selectCourses,
  updateTeacherMarksByCourseId,
  updateTeacherMarksByCourseId2
} from "../../api/coursesApi.js";
import {setEventsContestScientificWorksDate, setEventsOpenChampionshipDate} from "../../api/eventsApi.js";
import {useDispatch} from "react-redux";
import {setAuthFromToken} from "../../store/UserReducers.js";
import {setCoursesAuditoriums} from "../../api/adminApi.js";

// eslint-disable-next-line react/prop-types
const Form = ({inputs = [], values = {}, buttonText, type, id = undefined}) => {

  const dispatch = useDispatch();
  const formValues = useState({});
  const formErrors = useState({});
  const requiredValues =
    {
      login: ['email', 'password'],
      pupilRegistration: ['email', 'password', 'name', 'surname', 'birthDate', 'phone', 'school', 'schoolClass', 'registrationAddress', 'parent1Name', 'parent1Surname', 'parent1Phone', 'parent1Email', 'agreement'],
      teacherRegistration: ['email', 'password', 'name', 'surname', 'birthDate', 'phone', 'school', 'schoolEndDate', 'university', 'universityEndDate', 'registrationAddress', 'agreement'],
      courseAdd: ['courseFile'],
      courseChange: ['courseFile'],
      newsAdd: ['newsTitle', 'newsDescription'],
      setDateOpenChampionship: ['dateOchStartEvents', 'dateOchEndEvents'],
      setDateContestScientificWorks: ['dateKnrFirstEvents', 'dateKnrSecondEvents', 'dateKnrThirdEvents'],
      pupilChangeData: ['email', 'phone', 'school'],
      teacherChangeData: ['email', 'phone', 'university'],
    }

  const [auditoriums, setAuditoriums] = useState({});
  const [coursesSelect, setCoursesSelect] = useState({});
  const [teacherMarks, setTeacherMarks] = useState({});
  const [errors, setErrors] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setAuditoriums(values);
    setCoursesSelect(values);
    setTeacherMarks(values);
  }, [location.pathname, JSON.stringify(values)]);

  const handleAuditoryChange = (auditoryId, value) => {
    setAuditoriums(prev => ({
      ...prev,
      [auditoryId]: value,
    }));
  };

  const handleCoursesSelectChange = (courseId, value) => {
    setCoursesSelect(prev => ({
      ...prev,
      [courseId]: value,
    }));
  };


  const handleTeacherMarksChange = (markId, value) => {
    setTeacherMarks(prev => ({
      ...prev,
      [markId]: value,
    }));
  };

  const handleErrorChange = (id, error) => {
    setErrors(prev => ({
      ...prev,
      [id]: error,
    }));
  };

  const navigate = useNavigate();

  const checkFormErrors = () => {
    return requiredValues[type].every(item => !formErrors[item] && formValues[item]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (type in requiredValues && !checkFormErrors()) {
      alert('Заполните все обязательные поля.');
      return;
    }
    if (errors) {
      alert('Заполните поля в правильном формате.');
      return;
    }
    if (type === 'login') {
      try {
        const accessToken = await userLogin(formValues.email, formValues.password);
        dispatch(setAuthFromToken(accessToken));
        navigate(HOME_ROUTE);
      } catch (error) {
        if (error.message.includes('401')) {
          alert(`Вы ввели неверные данные или администратор еще не рассмотрел вашу регистрацию. Подождите немного и попробуйте позже`);
        } else {
          alert(`Возникла ошибка во время входа в аккаунт: ${error.message}`);
        }
      }
    } else if (type === 'pupilRegistration') {
      try {
        await pupilRegistration(formValues);
        navigate(LOGIN_ROUTE);
      } catch (error) {
        if (error.message.includes(400)) {
          alert('Пользователь с такой почтой уже существует');
        }
      }
    } else if (type === 'teacherRegistration') {
      try {
        await teacherRegistration(formValues);
        navigate(LOGIN_ROUTE);
      } catch (error) {
        if (error.message.includes(400)) {
          alert('Пользователь с такой почтой уже существует');
        }
      }
    } else if (type === 'pupilChangeData') {
      try {
        const accessToken = await pupilChangeData(formValues.photo, formValues.email, formValues.phone, formValues.school);
        dispatch(setAuthFromToken(accessToken));
        alert('Данные успешно изменены!');
      } catch (error) {
        alert(`Упс, что-то пошло не так...\nОшибка: ${error}`)
      }
    } else if (type === 'teacherChangeData') {
      try {
        const accessToken = await teacherChangeData(formValues.photo, formValues.email, formValues.phone, formValues.university, formValues.work);
        dispatch(setAuthFromToken(accessToken));
        alert('Данные успешно изменены!');
      } catch (error) {
        alert(`Упс, что-то пошло не так...\nОшибка: ${error}`)
      }
    } else if (type === 'courseAdd') {
      try {
        await courseAdd(formValues.courseFile);
        alert('Новый курс успешно добавлен.');
        navigate(ALL_COURSES_ROUTE);
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else if (type === 'courseChange') {
      try {
        await courseChange(id, formValues.courseFile);
        alert('Курс успешно изменен.');
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }

    } else if (type === 'newsAdd') {
      try {
        await addNewsItem(formValues.newsTitle, formValues.newsDescription, formValues.newsPhoto, formValues.newsFile);
        alert('Новость успешно создана.');
        navigate(NEWS_ROUTE);
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else if (type === 'setDateOpenChampionship') {
      try {
        await setEventsOpenChampionshipDate(formValues.dateOchStartEvents, formValues.dateOchEndEvents);
        alert('Даты мероприятия успешно сохранены');
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else if (type === 'setDateContestScientificWorks') {
      try {
        await setEventsContestScientificWorksDate(formValues.dateKnrFirstEvents, formValues.dateKnrSecondEvents, formValues.dateKnrThirdEvents);
        alert('Даты мероприятия успешно сохранены');
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else if (type === 'setCoursesAuditoriums') {
      try {
        await setCoursesAuditoriums(auditoriums);
        alert('Аудитории сохранены');
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else if (type === 'selectCourses') {
      try {
        await selectCourses(coursesSelect);
        alert('Курсы выбраны успешно');
      } catch {
        alert(`Упс... Что-то пошло не так. Выберете ровно 2 зачетных курса из разных категорий`);
      }
    } else if (type === 'saveTeacherMarks') {
      try {
        await updateTeacherMarksByCourseId(id, teacherMarks);
        alert('Оценки успешно сохранены');
      } catch {
        alert(`Упс... Что-то пошло не так`);
      }
    } else if (type === 'saveTeacherMarks2') {
      try {
        await updateTeacherMarksByCourseId2(id, teacherMarks);
        alert('Оценки успешно сохранены');
      } catch {
        alert(`Упс... Что-то пошло не так`);
      }
    } else if (type === 'forgetPassword') {
      try {
        await changePassword(formValues.forgetPassword);
        alert('Пароль успешно изменен');
      } catch {
        alert(`Упс... Что-то пошло не так`);
      }
    } else {
      alert(`Invalid type: ${type}`);
    }
  }

  const showInput = (input) => {
    switch (input) {
      case 'forgetPassword': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [forgetPassword, setForgetPassword] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.forgetPassword = forgetPassword;
        formErrors.forgetPassword = error;
        return <InputEmail name={input} value={forgetPassword} setValue={setForgetPassword} formErrors={setError}
                           placeholder='Введите вашу почту' fieldName='Почта*'
        />
      }
      case 'email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [email, setEmail] = useState(values.email);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.email = email || values.email;
        formErrors.email = error;
        return <InputEmail name={input} value={email || values.email} setValue={setEmail} formErrors={setError}
                           placeholder='Введите вашу почту' fieldName='Почта*'
        />
      }
      case 'password': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [password, setPassword] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.password = password;
        formErrors.password = error;
        return <InputPassword name={input} placeholder='Введите ваш пароль'
                              fieldName='Пароль*' formErrors={setError}
                              value={password} setValue={setPassword}
        />
      }
      case 'photo': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [photo, setPhoto] = useState(values.photo);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.photo = photo || values.photo;
        formErrors.photo = error;
        return <InputPhoto setValue={setPhoto} formErrors={setError}
                           name={input} accept='image/png, image/gif, image/jpeg, image/jpg'
                           fieldName='Выберете фото профиля'
                           value={photo || values.photo}
        />
      }
      case 'name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [name, setName] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.name = name;
        formErrors.name = error;
        return <InputName name={input} placeholder='Введите свое имя' formErrors={setError}
                          fieldName='Имя*'
                          value={name} setValue={setName}
        />
      }
      case 'surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [surname, setSurname] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.surname = surname;
        formErrors.surname = error;
        return <InputName name={input} placeholder='Введите свою фамилию' formErrors={setError}
                          fieldName='Фамилия*'
                          value={surname} setValue={setSurname}
        />
      }
      case 'lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [lastname, setLastname] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.lastname = lastname;
        formErrors.lastname = error;
        return <InputName name={input} placeholder='Введите свое отчество' formErrors={setError}
                          fieldName='Отчество'
                          value={lastname} setValue={setLastname}
        />
      }
      case 'birthDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [birthDate, setBirthDate] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.birthDate = birthDate;
        formErrors.birthDate = error;
        return <InputDate name={input} formErrors={setError}
                          fieldName='Дата рождения*'
                          value={birthDate} setValue={setBirthDate}
        />
      }
      case 'phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [phone, setPhone] = useState(values.phone);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.phone = phone || values.phone;
        formErrors.phone = error;
        return <InputPhone name={input} placeholder='Введите свой номер телефона' formErrors={setError}
                           fieldName='Телефон*'
                           value={phone || values.phone} setValue={setPhone}
        />
      }
      case 'school': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [school, setSchool] = useState(values.school);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.school = school || values.school;
        formErrors.school = error;
        return <InputText name={input} placeholder='Введите название своей школы' formErrors={setError}
                          fieldName='Школа*'
                          value={school || values.school} setValue={setSchool}
        />
      }
      case 'schoolClass': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [schoolClass, setSchoolClass] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.schoolClass = schoolClass;
        formErrors.schoolClass = error;
        return <InputYear name={input} placeholder='Введите номер класса' formErrors={setError}
                          fieldName='Номер класса*'
                          value={schoolClass}
                          setValue={setSchoolClass}
        />
      }
      case 'schoolEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [schoolEndDate, setSchoolEndDate] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.schoolEndDate = schoolEndDate;
        formErrors.schoolEndDate = error;
        return <InputYear name={input} placeholder='Введите год окончания школы' formErrors={setError}
                          fieldName='Год окончания школы*'
                          value={schoolEndDate}
                          setValue={setSchoolEndDate}
        />
      }
      case 'university': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [university, setUniversity] = useState(values.university);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.university = university || values.university;
        formErrors.university = error;
        return <InputText name={input} placeholder='Введите название университета' formErrors={setError}
                          fieldName='Университет*'
                          value={university || values.university} setValue={setUniversity}
        />
      }
      case 'universityEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [universityEndDate, setUniversityEndDate] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.universityEndDate = universityEndDate;
        formErrors.universityEndDate = error;
        return <InputYear name={input} placeholder='Введите год окончания университета'
                          formErrors={setError}
                          fieldName='Год окончания университета*'
                          value={universityEndDate}
                          setValue={setUniversityEndDate}
        />
      }
      case 'registrationAddress': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [registrationAddress, setRegistrationAddress] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.registrationAddress = registrationAddress;
        formErrors.registrationAddress = error;
        return <InputText name={input} placeholder='Введите свой адрес регистрации'
                          formErrors={setError}
                          fieldName='Адрес регистрации*'
                          value={registrationAddress}
                          setValue={setRegistrationAddress}
        />
      }
      case 'work': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [work, setWork] = useState(values.work);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.work = work || values.work;
        formErrors.work = error;
        return <InputText name={input} placeholder='Введите место работы' formErrors={setError}
                          fieldName='Место работы'
                          value={work || values.work} setValue={setWork}
        />
      }
      case 'telegram': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [telegram, setTelegram] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.telegram = telegram;
        formErrors.telegram = error;
        return <InputMessenger name={input} placeholder='Введите свой ник в Телеграме' formErrors={setError}
                               fieldName='Телеграм'
                               value={telegram} setValue={setTelegram}
        />
      }
      case 'vk': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [vk, setVk] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.vk = vk;
        formErrors.vk = error;
        return <InputMessenger name={input} placeholder='Введите свой ник в ВК' formErrors={setError}
                               fieldName='ВК'
                               value={vk} setValue={setVk}
        />
      }
      case 'parent1Name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Name, setParent1Name] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent1Name = parent1Name;
        formErrors.parent1Name = error;
        return <InputName name={input} placeholder='Введите имя первого родителя / опекуна'
                          fieldName='Имя первого родителя / опекуна*' formErrors={setError}
                          value={parent1Name}
                          setValue={setParent1Name}
        />
      }
      case 'parent1Surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Surname, setParent1Surname] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent1Surname = parent1Surname;
        formErrors.parent1Surname = error;
        return <InputName name={input} placeholder='Введите фамилию первого родителя / опекуна'
                          fieldName='Фамилия первого родителя / опекуна*' formErrors={setError}
                          value={parent1Surname}
                          setValue={setParent1Surname}
        />
      }
      case 'parent1Lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Lastname, setParent1Lastname] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent1Lastname = parent1Lastname;
        formErrors.parent1Lastname = error;
        return <InputName name={input} placeholder='Введите отчество первого родителя / опекуна'
                          fieldName='Отчество первого родителя / опекуна' formErrors={setError}
                          value={parent1Lastname}
                          setValue={setParent1Lastname}
        />
      }
      case 'parent1Phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Phone, setParent1Phone] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent1Phone = parent1Phone;
        formErrors.parent1Phone = error;
        return <InputPhone name={input} placeholder='Введите телефон первого родителя / опекуна'
                           fieldName='Телефон первого родителя / опекуна*' formErrors={setError}
                           value={parent1Phone}
                           setValue={setParent1Phone}
        />
      }
      case 'parent1Email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Email, setParent1Email] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent1Email = parent1Email;
        formErrors.parent1Email = error;
        return <InputEmail name={input} placeholder='Введите почту первого родителя / опекуна'
                           fieldName='Почта первого родителя / опекуна*' formErrors={setError}
                           value={parent1Email}
                           setValue={setParent1Email}
        />
      }
      case 'parent2Name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Name, setParent2Name] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent2Name = parent2Name;
        formErrors.parent2Name = error;
        return <InputName name={input} placeholder='Введите имя второго родителя / опекуна'
                          fieldName='Имя второго родителя / опекуна' formErrors={setError}
                          value={parent2Name}
                          setValue={setParent2Name}
        />
      }
      case 'parent2Surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Surname, setParent2Surname] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent2Surname = parent2Surname;
        formErrors.parent2Surname = error;
        return <InputName name={input} placeholder='Введите фамилию второго родителя / опекуна'
                          fieldName='Фамилия второго родителя / опекуна' formErrors={setError}
                          value={parent2Surname}
                          setValue={setParent2Surname}
        />
      }
      case 'parent2Lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Lastname, setParent2Lastname] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent2Lastname = parent2Lastname;
        formErrors.parent2Lastname = error;
        return <InputName name={input} placeholder='Введите отчество второго родителя / опекуна'
                          fieldName='Отчество второго родителя / опекуна' formErrors={setError}
                          value={parent2Lastname}
                          setValue={setParent2Lastname}
        />
      }
      case 'parent2Phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Phone, setParent2Phone] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent2Phone = parent2Phone;
        formErrors.parent2Phone = error;
        return <InputPhone name={input} placeholder='Введите телефон второго родителя / опекуна'
                           fieldName='Телефон второго родителя / опекуна' formErrors={setError}
                           value={parent2Phone}
                           setValue={setParent2Phone}
        />
      }
      case 'parent2Email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Email, setParent2Email] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.parent2Email = parent2Email;
        formErrors.parent2Email = error;
        return <InputEmail name={input} placeholder='Введите почту второго родителя / опекуна'
                           fieldName='Почта второго родителя / опекуна' formErrors={setError}
                           value={parent2Email}
                           setValue={setParent2Email}
        />
      }
      case 'agreement': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreement, setAgreement] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.agreement = agreement;
        formErrors.agreement = error;
        return <InputFile name={input} accept='.pdf' formErrors={setError}
                          fieldName='Согласие на обработку персональных данных*'
                          setValue={setAgreement}
        />
      }
      case 'howToKnow': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [howToKnow, setHowToKnow] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.howToKnow = howToKnow;
        formErrors.howToKnow = error;
        return <InputDropdown name={input} placeholder='Расскажжите откуда вы узнали об ЭМШ'
                              fieldName='Откуда вы узнали об ЭМШ' formErrors={setError}
                              values={['От друзей', 'Из социальных сетей', 'На дополнительных курсах']}
                              setValue={setHowToKnow}/>
      }
      case 'mailing': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [mailing, setMailing] = useState(true);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.mailing = mailing;
        formErrors.mailing = error;
        return <InputCheckbox name={input} fieldName='Согласие на получение рассылки' value={mailing}
                              formErrors={setError}
                              setValue={setMailing}/>
      }
      case 'wasPupil': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [wasPupil, setWasPupil] = useState(true);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.wasPupil = wasPupil;
        formErrors.wasPupil = error;
        return <InputCheckbox name={input} fieldName='Был ли учеником ЭМШ' value={wasPupil}
                              formErrors={setError}
                              setValue={setWasPupil}/>
      }

      case 'courseFile': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [courseFile, setCourseFile] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.courseFile = courseFile;
        formErrors.courseFile = error;
        return <InputFile name={input} accept='.xls, .xlsx, .csv'
                          formErrors={setError}
                          setValue={setCourseFile}
        />
      }

      case 'newsTitle': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsTitle, setNewsTitle] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.newsTitle = newsTitle;
        formErrors.newsTitle = error;
        return <InputNewsTitle name={input} placeholder='Введите заголовок новости' formErrors={setError}
                               fieldName='Заголовок новости*'
                               value={newsTitle}
                               setValue={setNewsTitle}
        />
      }
      case 'newsPhoto': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsPhoto, setNewsPhoto] = useState(undefined);
        formValues.newsPhoto = newsPhoto;
        return <InputPhoto name={input}
                           fieldName='Фотография новости'
                           setValue={setNewsPhoto}
                           accept='image/png, image/gif, image/jpeg, image/jpg'
        />
      }
      case 'newsFile': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsFile, setNewsFile] = useState(undefined);
        formValues.newsFile = newsFile;
        return <InputFile name={input} accept='.pdf, .xls, .xlsx, .csv, .docx, .pptx, .doc'
                          fieldName='Файл новости'
                          setValue={setNewsFile}
        />
      }
      case 'newsDescription': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsDescription, setNewsDescription] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.newsDescription = newsDescription;
        formErrors.newsDescription = error;
        return <InputNewsDescription name={input} placeholder='Введите текст новости'
                                     formErrors={setError}
                                     fieldName='Описание новости*'
                                     value={newsDescription}
                                     setValue={setNewsDescription}
        />
      }

      case 'dateOchStartEvents': {
        const dateArr = values.dateOchStartEvents.split('.');
        const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateOchStartEvents, setDateOchStartEvents] = useState(values.dateOchStartEvents);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateOchStartEvents = dateOchStartEvents || values.dateOchStartEvents;
        formErrors.dateOchStartEvents = error;
        return <InputDate name={input} placeholder='Введите дату мероприятия' fieldName='Дата мероприятия'
                          value={dateOchStartEvents || date}
                          setValue={setDateOchStartEvents} formErrors={setError}
        />
      }
      case 'dateOchEndEvents': {
        const dateArr = values.dateOchEndEvents.split('.');
        const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateOchEndEvents, setDateOchEndEvents] = useState(values.dateOchEndEvents);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateOchEndEvents = dateOchEndEvents || values.dateOchEndEvents;
        formErrors.dateOchEndEvents = error;
        return <InputDate name={input} placeholder='Введите дату церемонии награждения' fieldName='Дата награждения'
                          value={dateOchEndEvents || date}
                          setValue={setDateOchEndEvents} formErrors={setError}
        />
      }

      case 'dateKnrFirstEvents': {
        const dateArr = values.dateKnrFirstEvents.split('.');
        const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateKnrFirstEvents, setDateKnrFirstEvents] = useState(values.dateKnrFirstEvents);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateKnrFirstEvents = dateKnrFirstEvents || date;
        formErrors.dateKnrFirstEvents = error;
        return <InputDate name={input} placeholder='Введите дату 1 тура' fieldName='Дата 1 тура'
                          value={dateKnrFirstEvents || date}
                          setValue={setDateKnrFirstEvents} formErrors={setError}
        />
      }
      case 'dateKnrSecondEvents': {
        const dateArr = values.dateKnrSecondEvents.split('.');
        const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateKnrSecondEvents, setDateKnrSecondEvents] = useState(values.dateKnrSecondEvents);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateKnrSecondEvents = dateKnrSecondEvents || date;
        formErrors.dateKnrSecondEvents = error;
        return <InputDate name={input} placeholder='Введите дату 2 тура' fieldName='Дата 2 тура'
                          value={dateKnrSecondEvents || date}
                          setValue={setDateKnrSecondEvents} formErrors={setError}
        />
      }
      case 'dateKnrThirdEvents': {
        const dateArr = values.dateKnrThirdEvents.split('.');
        const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateKnrThirdEvents, setDateKnrThirdEvents] = useState(values.dateKnrThirdEvents);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateKnrThirdEvents = dateKnrThirdEvents || date;
        formErrors.dateKnrThirdEvents = error;
        return <InputDate name={input} placeholder='Введите дату 3 тура' fieldName='Дата 3 тура'
                          value={dateKnrThirdEvents || date}
                          setValue={setDateKnrThirdEvents} formErrors={setError}
        />
      }

      default: {
        const matchAuditory = input.match(/^auditory (\d+)/);  // for selecting auditory for admin
        const matchCourse = input.match(/^course (\d+)/);  // for selecting courses for pupils
        const matchMarks = input.match(/^\d+\s\d{2}\.\d{2}\.\d{4}\s([A-Za-zА-Яа-я]+\s?)+$/);  // for filling marks for teachers
        const matchVisits = input.match(/^visits\s\d{2}\.\d{2}\.\d{4}$/);  // for num of visits of each date

        if (matchAuditory) {
          const auditoryId = `auditory ${matchAuditory[1]}`;

          return (
            <InputText
              name={input}
              placeholder='Введите аудиторию / zoom'
              value={auditoriums[auditoryId]}
              setValue={(value) => handleAuditoryChange(auditoryId, value)}
            />
          );
        }

        if (matchCourse) {
          const courseId = `course ${matchCourse[1]}`;

          return (
            <InputDropdown
              name={input}
              placeholder='Зачетный / незачетный'
              value={coursesSelect[courseId]}
              values={['Зачетный', 'Незачетный', '']}
              setValue={(value) => handleCoursesSelectChange(courseId, value)}
              formErrors={(error) => handleErrorChange(courseId, error)}
            />
          );
        }

        if (matchMarks) {
          const markId = `${matchMarks[0]}`;

          return (
            <InputText
              name={input}
              value={teacherMarks[markId]}
              setValue={(value) => handleTeacherMarksChange(markId, value)}
              formErrors={(error) => handleErrorChange(markId, error)}
            />
          );
        }

        if (matchVisits) {
          const visitId = `${matchVisits[0]}`;

          return (
            <InputText
              name={input}
              value={teacherMarks[visitId]}
              setValue={(value) => handleTeacherMarksChange(visitId, value)}
              formErrors={(error) => handleErrorChange(visitId, error)}
            />
          );
        }

        return <input value={input}/>
      }
    }
  }

  return (
    <form className={style.form} onSubmit={onSubmit}>
      {id && !inputs.includes('courseFile') ?
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem 0',
        }}>
          {/* eslint-disable-next-line no-unused-vars */}
          {Object.entries(inputs).map(([key, input]) => (
            <div key={input} style={{
              display: 'flex',
              gap: '0 1rem',
            }}>
              {input.map((item) => (
                showInput(item)
              ))}

            </div>
          ))}
        </section> :
        (inputs.map((input) => showInput(input)))
      }

      <ButtonSubmit text={buttonText}/>
    </form>
  );
};

export default Form;