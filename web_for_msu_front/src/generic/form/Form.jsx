import style from './form.module.css'
import InputEmail from "./inputs/userInputs/InputEmail.jsx";
import InputPassword from "./inputs/userInputs/InputPassword.jsx";
import ButtonSubmit from "./submit/ButtonSubmit.jsx";
import {
  pupilChangeData, pupilRegistration, teacherChangeData, teacherRegistration, userChangePhoto, userLogin
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
import {useState} from "react";
import InputPhoto from "./inputs/userInputs/InputPhoto.jsx";
import InputNewsTitle from "./inputs/newsInputs/InputNewsTitle.jsx";
import InputNewsPhoto from "./inputs/newsInputs/InputNewsPhoto.jsx";
import {addNewsItem} from "../../api/newsApi.js";
import InputNewsDescription from "./inputs/newsInputs/InputNewsDescription.jsx";
import {useNavigate} from "react-router-dom";
import {ALL_COURSES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, NEWS_ROUTE} from "../../routing/consts.js";
import {courseAdd, courseChange} from "../../api/coursesApi.js";
import InputClass from "./inputs/testsRegistrationInputs/InputClass.jsx";
import {setEventsContestScientificWorksDate, setEventsOpenChampionshipDate} from "../../api/eventsApi.js";

// eslint-disable-next-line react/prop-types
const Form = ({
                inputs = [], values = {}, buttonText, type, dispatch = () => {
  }
              }) => {

  const formValues = useState({});
  const formErrors = useState({});
  const requiredValues =
    {
      login: ['email', 'password'],
      pupilRegistration: ['email', 'password', 'name', 'surname', 'birthDate', 'phone', 'school', 'schoolEndDate', 'registrationAddress', 'parent1Name', 'parent1Surname', 'parent1Phone', 'parent1Email', 'agreement'],
      teacherRegistration: ['email', 'password', 'name', 'surname', 'birthDate', 'phone', 'school', 'schoolEndDate', 'university', 'universityEndDate', 'registrationAddress', 'agreement'],
      courseAdd: ['courseFile'],
      courseChange: ['courseFile'],
      newsAdd: ['newsTitle', 'newsDescription'],
      setDateOpenChampionship: ['dateOchStart', 'dateOchEnd'],
      setDateContestScientificWorks: ['dateKnrFirst', 'dateKnrSecond', 'dateKnrThird'],
    }

  const navigate = useNavigate();

  const checkFormErrors = () => {
    return requiredValues[type].every(item => !formErrors[item] && formValues[item]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkFormErrors()) {
      alert('Заполните все обязательные поля.');
    }
    if (type === 'login') {
      await userLogin(formValues.email, formValues.password, dispatch);
      navigate(HOME_ROUTE);
    } else if (type === 'pupilRegistration') {
      await pupilRegistration(formValues);
      navigate(LOGIN_ROUTE);
    } else if (type === 'teacherRegistration') {
      await teacherRegistration(formValues);
      navigate(LOGIN_ROUTE);
    } else if (type === 'userChangePhoto') {
      await userChangePhoto(formValues.photo);
    } else if (type === 'pupilChangeData') {
      await pupilChangeData(formValues.name, formValues.surname, formValues.lastname, formValues.email, formValues.phone, formValues.school);
    } else if (type === 'teacherChangeData') {
      await teacherChangeData(formValues.name, formValues.surname, formValues.lastname, formValues.email, formValues.phone, formValues.university, formValues.work);
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
        await courseChange(formValues.courseFile);
        alert('Курс успешно изменен.');
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }

    } else if (type === 'newsAdd') {
      try {
        await addNewsItem(formValues.newsTitle, formValues.newsDescription, formValues.newsPhoto);
        alert('Новость успешно создана.');
        navigate(NEWS_ROUTE);
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else if (type === 'setDateOpenChampionship') {
      try {
        await setEventsOpenChampionshipDate(formValues.dateOchStart, formValues.dateOchEnd);
        alert('Даты мероприятия успешно сохранены');
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else if (type === 'setDateContestScientificWorks') {
      try {
        await setEventsContestScientificWorksDate(formValues.dateKnrFirst, formValues.dateKnrSecond, formValues.dateKnrThird);
        alert('Даты мероприятия успешно сохранены');
      } catch (error) {
        alert(`Упс... Что-то пошло не так: ${error.message}`);
      }
    } else {
      alert(`Invalid type: ${type}`);
    }
  }

  const showInput = (input) => {
    switch (input) {
      case 'email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [email, setEmail] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.email = email;
        formErrors.email = error;
        return <InputEmail name={input} value={email} setValue={setEmail} formErrors={setError}
                           placeholder='Введите вашу почту' fieldName='Почта*'
        />
      }
      case 'password': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [password, setPassword] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.password = password;
        formErrors.password = error;
        return <InputPassword name={input} placeholder='Введите ваш пароль'
                              fieldName='Пароль*' formErrors={setError}
                              value={password} setValue={setPassword}
        />
      }
      case 'newPassword': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newPassword, setNewPassword] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.newPassword = newPassword;
        formErrors.newPassword = error;
        return <InputPassword name={input} placeholder='Введите новый пароль'
                              fieldName='Новый пароль' formErrors={setError}
                              value={newPassword} setValue={setNewPassword}
        />
      }
      case 'photo': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [photo, setPhoto] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.photo = photo;
        formErrors.photo = error;
        return <InputPhoto setValue={setPhoto} formErrors={setError}
                           name={input} accept='image/png, image/gif, image/jpeg, image/jpg'
                           fieldName='Выберете фото профиля'
        />
      }
      case 'name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [name, setName] = useState(values[input]);
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
        const [surname, setSurname] = useState(values[input]);
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
        const [lastname, setLastname] = useState(values[input]);
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
        const [birthDate, setBirthDate] = useState(values[input]);
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
        const [phone, setPhone] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.phone = phone;
        formErrors.phone = error;
        return <InputPhone name={input} placeholder='Введите свой номер телефона' formErrors={setError}
                           fieldName='Телефон*'
                           value={phone} setValue={setPhone}
        />
      }
      case 'school': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [school, setSchool] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.school = school;
        formErrors.school = error;
        return <InputText name={input} placeholder='Введите название своей школы' formErrors={setError}
                          fieldName='Школа*'
                          value={school} setValue={setSchool}
        />
      }
      case 'schoolEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [schoolEndDate, setSchoolEndDate] = useState(values[input]);
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
        const [university, setUniversity] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.university = university;
        formErrors.university = error;
        return <InputText name={input} placeholder='Введите название университета' formErrors={setError}
                          fieldName='Университет*'
                          value={university} setValue={setUniversity}
        />
      }
      case 'universityEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [universityEndDate, setUniversityEndDate] = useState(values[input]);
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
        const [registrationAddress, setRegistrationAddress] = useState(values[input]);
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
        const [work, setWork] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.work = work;
        formErrors.work = error;
        return <InputText name={input} placeholder='Введите свое место работы' formErrors={setError}
                          fieldName='Место работы'
                          value={work} setValue={setWork}
        />
      }
      case 'telegram': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [telegram, setTelegram] = useState(values[input]);
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
        const [vk, setVk] = useState(values[input]);
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
        const [parent1Name, setParent1Name] = useState(values[input]);
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
        const [parent1Surname, setParent1Surname] = useState(values[input]);
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
        const [parent1Lastname, setParent1Lastname] = useState(values[input]);
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
        const [parent1Phone, setParent1Phone] = useState(values[input]);
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
        const [parent1Email, setParent1Email] = useState(values[input]);
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
        const [parent2Name, setParent2Name] = useState(values[input]);
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
        const [parent2Surname, setParent2Surname] = useState(values[input]);
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
        const [parent2Lastname, setParent2Lastname] = useState(values[input]);
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
        const [parent2Phone, setParent2Phone] = useState(values[input]);
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
        const [parent2Email, setParent2Email] = useState(values[input]);
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
        const [agreement, setAgreement] = useState(values[input]);
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
        const [howToKnow, setHowToKnow] = useState(values[input]);
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
        return <InputCheckbox name={input} fieldName='Согласие на получение рассылки' initialChecked={true}
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
        return <InputCheckbox name={input} fieldName='Был ли учеником ЭМШ' initialChecked={true}
                              formErrors={setError}
                              setValue={setWasPupil}/>
      }

      case 'courseFile': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [courseFile, setCourseFile] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.courseFile = courseFile;
        formErrors.courseFile = error;
        return <InputFile name={input} accept='.xls, .xlsx, .csv'
                          fieldName='Добавить курс*'
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
        const [newsPhoto, setNewsPhoto] = useState();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.newsPhoto = newsPhoto;
        formErrors.newsPhoto = error;
        return <InputNewsPhoto name={input}
                               fieldName='Фотография новости' formErrors={setError}
                               value={newsPhoto}
                               setValue={setNewsPhoto}
                               accept='image/png, image/gif, image/jpeg, image/jpg'
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

      case 'classOver': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [classOver, setClassOver] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.classOver = classOver;
        formErrors.classOver = error;
        return <InputClass name={input} placeholder='Введите номер класса, который вы заканчиваете в этом году'
                           fieldName='Номер класса*' formErrors={setError}
                           value={classOver}
                           setValue={setClassOver}
        />
      }
      case 'city': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [city, setCity] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.city = city;
        formErrors.city = error;
        return <InputText name={input} placeholder='Введите название города' formErrors={setError}
                          fieldName='Название города*'
                          value={city}
                          setValue={setCity}
        />
      }
      case 'format': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [format, setFormat] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.format = format;
        formErrors.format = error;
        return <InputDropdown name={input} placeholder='Выберете формат обучения в ЭМШ' formErrors={setError}
                              fieldName='Формат обучения в ЭМШ*'
                              values={['Очный', 'Онлайн (я не из Москвы)']}
                              setValue={setFormat}/>
      }
      case 'agreementAb': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreementAb, setAgreementAb] = useState(undefined);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.agreementAb = agreementAb;
        formErrors.agreementAb = error;
        return <InputCheckbox name={input} fieldName='Согласие на обработку персональных данных*' initialChecked={true}
                              setValue={setAgreementAb} formErrors={setError} required={true}/>
      }

      case 'dateOchStart': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateOchStart, setDateOchStart] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateOchStart = dateOchStart;
        formErrors.dateOchStart = error;
        return <InputText name={input} placeholder='Введите дату мероприятия' fieldName='Дата мероприятия'
                          value={dateOchStart} setValue={setDateOchStart} formErrors={setError}
        />
      }
      case 'dateOchEnd': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateOchEnd, setDateOchEnd] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateOchEnd = dateOchEnd;
        formErrors.dateOchEnd = error;
        return <InputText name={input} placeholder='Введите дату церемонии награждения' fieldName='Дата награждения'
                          value={dateOchEnd} setValue={setDateOchEnd} formErrors={setError}
        />
      }

      case 'dateKnrFirst': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateKnrFirst, setDateKnrFirst] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateKnrFirst = dateKnrFirst;
        formErrors.dateKnrFirst = error;
        return <InputText name={input} placeholder='Введите дату 1 тура' fieldName='Дата 1 тура'
                          value={dateKnrFirst} setValue={setDateKnrFirst} formErrors={setError}
        />
      }
      case 'dateKnrSecond': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateKnrSecond, setDateKnrSecond] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateKnrSecond = dateKnrSecond;
        formErrors.dateKnrSecond = error;
        return <InputText name={input} placeholder='Введите дату 2 тура' fieldName='Дата 2 тура'
                          value={dateKnrSecond} setValue={setDateKnrSecond} formErrors={setError}
        />
      }
      case 'dateKnrThird': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [dateKnrThird, setDateKnrThird] = useState(values[input]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false);
        formValues.dateKnrThird = dateKnrThird;
        formErrors.dateKnrThird = error;
        return <InputText name={input} placeholder='Введите дату 3 тура' fieldName='Дата 3 тура'
                          value={dateKnrThird} setValue={setDateKnrThird} formErrors={setError}
        />
      }

      default:
        return <input value={input}/>
    }
  }

  return (
    <form className={style.form} onSubmit={onSubmit}>
      {inputs.map((input) => (showInput(input)))}

      <ButtonSubmit text={buttonText}/>
    </form>
  );
};

export default Form;