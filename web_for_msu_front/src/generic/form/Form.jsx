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
import {useEffect, useState} from "react";
import InputPhoto from "./inputs/userInputs/InputPhoto.jsx";
import InputNewsTitle from "./inputs/newsInputs/InputNewsTitle.jsx";
import InputNewsPhoto from "./inputs/newsInputs/InputNewsPhoto.jsx";
import {addNewsItem} from "../../api/newsApi.js";
import InputNewsDescription from "./inputs/newsInputs/InputNewsDescription.jsx";
import {useNavigate} from "react-router-dom";
import {ALL_COURSES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, NEWS_ROUTE} from "../../routing/consts.js";
import {courseAdd, courseChange} from "../../api/coursesApi.js";
import {testsRegistration} from "../../api/eventsApi.js";
import InputClass from "./inputs/testsRegistrationInputs/InputClass.jsx";

// eslint-disable-next-line react/prop-types
const Form = ({inputs = [], values = {}, buttonText, type}) => {

  const formValues = useState({});
  const formErrors = useState({});
  const requiredValues =
    {
      login: ['email', 'password'],
      pupilRegistration: ['email', 'password', 'name', 'surname', 'birthdate', 'phone', 'school', 'schoolEndDate', 'registrationAddress', 'parent1Name', 'parent1Surname', 'parent1Phone', 'parent1Email', 'agreement'],
      teacherRegistration: ['email', 'password', 'name', 'surname', 'birthdate', 'phone', 'school', 'schoolEndDate', 'university', 'universityEndDate', 'registrationAddress', 'agreement'],
      courseAdd: ['courseFile'],
      courseChange: ['courseFile'],
      newsAdd: ['newsTitle', 'newsDescription'],
      testsRegistration: ['name', 'surname', 'email', 'phone', 'classOver', 'format', 'city', 'agreementAb'],
    }

  /*useEffect(() => {
    requiredValues[type].forEach(item => {
      console.log(formValues[item]);
    })
  }, [formValues]);*/

  const navigate = useNavigate();

  const checkFormErrors = () => {
    console.log(formErrors)
    return requiredValues[type].every(item => !formErrors[item]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (type === 'login') {
      if (checkFormErrors()) {
        await userLogin(formValues.email, formValues.password);
        navigate(HOME_ROUTE);
      } else {
        alert('Заполните все обязательные поля.');
      }
    } else if (type === 'pupilRegistration') {
      if (checkFormErrors()) {
        await pupilRegistration(formValues);
        navigate(LOGIN_ROUTE);
      } else {
        alert('Заполните все обязательные поля.');
      }
    } else if (type === 'teacherRegistration') {
      if (checkFormErrors()) {
        await teacherRegistration(formValues);
        navigate(LOGIN_ROUTE);
      } else {
        alert('Заполните все обязательные поля.');
      }
    } else if (type === 'userChangePhoto') {
      await userChangePhoto(formValues.photo);
    } else if (type === 'pupilChangeData') {
      await pupilChangeData(formValues.name, formValues.surname, formValues.lastname, formValues.email, formValues.phone, formValues.school);
    } else if (type === 'teacherChangeData') {
      await teacherChangeData(formValues.name, formValues.surname, formValues.lastname, formValues.email, formValues.phone, formValues.university, formValues.work);
    } else if (type === 'courseAdd') {
      if (checkFormErrors()) {
        try {
          await courseAdd(formValues.courseFile);
          alert('Новый курс успешно добавлен.');
          navigate(ALL_COURSES_ROUTE);
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert('Заполните все обязательные поля.');
      }
    } else if (type === 'courseChange') {
      if (checkFormErrors()) {
        try {
          await courseChange(formValues.courseFile);
          alert('Курс успешно изменен.');
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert('Заполните все обязательные поля.');
      }
    } else if (type === 'newsAdd') {
      if (checkFormErrors()) {
        try {
          await addNewsItem(formValues.newsTitle, formValues.newsDescription, formValues.newsPhoto);
          alert('Новость успешно создана.');
          navigate(NEWS_ROUTE);
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert('Заполните все обязательные поля.');
      }
    } else if (type === 'testsRegistration') {
      if (checkFormErrors()) {
        await testsRegistration(formValues);
        alert('Форма успешно отправлена!');
      } else {
        alert('Заполните все обязательные поля.');
      }
    } else {
      console.error('Invalid type:', type);
    }
  }

  const showInput = (input) => {
    switch (input) {
      case 'email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [email, setEmail] = useState(values[input]);
        formValues.email = email;
        formErrors.email = null;
        return <InputEmail name={input} value={email} setValue={setEmail} formErrors={formErrors.email}
                           placeholder='Введите вашу почту' fieldName='Почта*'
        />
      }
      case 'password': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [password, setPassword] = useState(values[input]);
        formValues.password = password;
        formErrors.password = null;
        return <InputPassword name={input} placeholder='Введите ваш пароль'
                              fieldName='Пароль*' formErrors={formErrors.password}
                              value={password} setValue={setPassword}
        />
      }
      case 'newPassword': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newPassword, setNewPassword] = useState(values[input]);
        formValues.newPassword = newPassword;
        formErrors.newPassword = null;
        return <InputPassword name={input} placeholder='Введите новый пароль'
                              fieldName='Новый пароль' formErrors={formErrors.newPassword}
                              value={newPassword} setValue={setNewPassword}
        />
      }
      case 'photo': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [photo, setPhoto] = useState(values[input]);
        formValues.photo = photo;
        formErrors.photo = null;
        return <InputPhoto setValue={setPhoto} formErrors={formErrors.photo}
                           name={input} accept='image/png, image/gif, image/jpeg, image/jpg'
                           fieldName='Выберете фото профиля'
        />
      }
      case 'name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [name, setName] = useState(values[input]);
        formValues.name = name;
        formErrors.name = null;
        return <InputName name={input} placeholder='Введите свое имя' formErrors={formErrors.name}
                          fieldName='Имя*'
                          value={name} setValue={setName}
        />
      }
      case 'surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [surname, setSurname] = useState(values[input]);
        formValues.surname = surname;
        formErrors.surname = null;
        return <InputName name={input} placeholder='Введите свою фамилию' formErrors={formErrors.surname}
                          fieldName='Фамилия*'
                          value={surname} setValue={setSurname}
        />
      }
      case 'lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [lastname, setLastname] = useState(values[input]);
        formValues.lastname = lastname;
        formErrors.lastname = null;
        return <InputName name={input} placeholder='Введите свое отчество' formErrors={formErrors.lastname}
                          fieldName='Отчество'
                          value={lastname} setValue={setLastname}
        />
      }
      case 'birthDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [birthDate, setBirthDate] = useState(values[input]);
        formValues.birthDate = birthDate;
        formErrors.birthDate = null;
        return <InputDate name={input} formErrors={formErrors.birthDate}
                          fieldName='Дата рождения*'
                          value={birthDate} setValue={setBirthDate}
        />
      }
      case 'phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [phone, setPhone] = useState(values[input]);
        formValues.phone = phone;
        formErrors.phone = null;
        return <InputPhone name={input} placeholder='Введите свой номер телефона' formErrors={formErrors.phone}
                           fieldName='Телефон*'
                           value={phone} setValue={setPhone}
        />
      }
      case 'school': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [school, setSchool] = useState(values[input]);
        formValues.school = school;
        formErrors.school = null;
        return <InputText name={input} placeholder='Введите название своей школы' formErrors={formErrors.school}
                          fieldName='Школа*'
                          value={school} setValue={setSchool}
        />
      }
      case 'schoolEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [schoolEndDate, setSchoolEndDate] = useState(values[input]);
        formValues.schoolEndDate = schoolEndDate;
        formErrors.schoolEndDate = null;
        return <InputYear name={input} placeholder='Введите год окончания школы' formErrors={formErrors.schoolEndDate}
                          fieldName='Год окончания школы*'
                          value={schoolEndDate}
                          setValue={setSchoolEndDate}
        />
      }
      case 'university': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [university, setUniversity] = useState(values[input]);
        formValues.university = university;
        formErrors.university = null;
        return <InputText name={input} placeholder='Введите название университета' formErrors={formErrors.university}
                          fieldName='Университет*'
                          value={university} setValue={setUniversity}
        />
      }
      case 'universityEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [universityEndDate, setUniversityEndDate] = useState(values[input]);
        formValues.universityEndDate = universityEndDate;
        formErrors.universityEndDate = null;
        return <InputYear name={input} placeholder='Введите год окончания университета'
                          formErrors={formErrors.universityEndDate}
                          fieldName='Год окончания университета*'
                          value={universityEndDate}
                          setValue={setUniversityEndDate}
        />
      }
      case 'registrationAddress': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [registrationAddress, setRegistrationAddress] = useState(values[input]);
        formValues.registrationAddress = registrationAddress;
        formErrors.registrationAddress = null;
        return <InputText name={input} placeholder='Введите свой адрес регистрации'
                          formErrors={formErrors.registrationAddress}
                          fieldName='Адрес регистрации*'
                          value={registrationAddress}
                          setValue={setRegistrationAddress}
        />
      }
      case 'work': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [work, setWork] = useState(values[input]);
        formValues.work = work;
        formErrors.work = null;
        return <InputText name={input} placeholder='Введите свое место работы' formErrors={formErrors.work}
                          fieldName='Место работы'
                          value={work} setValue={setWork}
        />
      }
      case 'telegram': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [telegram, setTelegram] = useState(values[input]);
        formValues.telegram = telegram;
        formErrors.telegram = null;
        return <InputMessenger name={input} placeholder='Введите свой ник в Телеграме' formErrors={formErrors.telegram}
                               fieldName='Телеграм'
                               value={telegram} setValue={setTelegram}
        />
      }
      case 'vk': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [vk, setVk] = useState(values[input]);
        formValues.vk = vk;
        formErrors.vk = null;
        return <InputMessenger name={input} placeholder='Введите свой ник в ВК' formErrors={formErrors.vk}
                               fieldName='ВК'
                               value={vk} setValue={setVk}
        />
      }
      case 'parent1Name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Name, setParent1Name] = useState(values[input]);
        formValues.parent1Name = parent1Name;
        formErrors.parent1Name = null;
        return <InputName name={input} placeholder='Введите имя первого родителя / опекуна'
                          fieldName='Имя первого родителя / опекуна*' formErrors={formErrors.parent1Name}
                          value={parent1Name}
                          setValue={setParent1Name}
        />
      }
      case 'parent1Surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Surname, setParent1Surname] = useState(values[input]);
        formValues.parent1Surname = parent1Surname;
        formErrors.parent1Surname = null;
        return <InputName name={input} placeholder='Введите фамилию первого родителя / опекуна'
                          fieldName='Фамилия первого родителя / опекуна*' formErrors={formErrors.parent1Surname}
                          value={parent1Surname}
                          setValue={setParent1Surname}
        />
      }
      case 'parent1Lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Lastname, setParent1Lastname] = useState(values[input]);
        formValues.parent1Lastname = parent1Lastname;
        formErrors.parent1Lastname = null;
        return <InputName name={input} placeholder='Введите отчество первого родителя / опекуна'
                          fieldName='Отчество первого родителя / опекуна' formErrors={formErrors.parent1Lastname}
                          value={parent1Lastname}
                          setValue={setParent1Lastname}
        />
      }
      case 'parent1Phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Phone, setParent1Phone] = useState(values[input]);
        formValues.parent1Phone = parent1Phone;
        formErrors.parent1Phone = null;
        return <InputPhone name={input} placeholder='Введите телефон первого родителя / опекуна'
                           fieldName='Телефон первого родителя / опекуна*' formErrors={formErrors.parent1Phone}
                           value={parent1Phone}
                           setValue={setParent1Phone}
        />
      }
      case 'parent1Email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Email, setParent1Email] = useState(values[input]);
        formValues.parent1Email = parent1Email;
        formErrors.parent1Email = null;
        return <InputEmail name={input} placeholder='Введите почту первого родителя / опекуна'
                           fieldName='Почта первого родителя / опекуна*' formErrors={formErrors.parent1Email}
                           value={parent1Email}
                           setValue={setParent1Email}
        />
      }
      case 'parent2Name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Name, setParent2Name] = useState(values[input]);
        formValues.parent2Name = parent2Name;
        formErrors.parent2Name = null;
        return <InputName name={input} placeholder='Введите имя второго родителя / опекуна'
                          fieldName='Имя второго родителя / опекуна' formErrors={formErrors.parent2Name}
                          value={parent2Name}
                          setValue={setParent2Name}
        />
      }
      case 'parent2Surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Surname, setParent2Surname] = useState(values[input]);
        formValues.parent2Surname = parent2Surname;
        formErrors.parent2Surname = null;
        return <InputName name={input} placeholder='Введите фамилию второго родителя / опекуна'
                          fieldName='Фамилия второго родителя / опекуна' formErrors={formErrors.parent2Surname}
                          value={parent2Surname}
                          setValue={setParent2Surname}
        />
      }
      case 'parent2Lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Lastname, setParent2Lastname] = useState(values[input]);
        formValues.parent2Lastname = parent2Lastname;
        formErrors.parent2Lastname = null;
        return <InputName name={input} placeholder='Введите отчество второго родителя / опекуна'
                          fieldName='Отчество второго родителя / опекуна' formErrors={formErrors.parent2Lastname}
                          value={parent2Lastname}
                          setValue={setParent2Lastname}
        />
      }
      case 'parent2Phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Phone, setParent2Phone] = useState(values[input]);
        formValues.parent2Phone = parent2Phone;
        formErrors.parent2Phone = null;
        return <InputPhone name={input} placeholder='Введите телефон второго родителя / опекуна'
                           fieldName='Телефон второго родителя / опекуна' formErrors={formErrors.parent2Phone}
                           value={parent2Phone}
                           setValue={setParent2Phone}
        />
      }
      case 'parent2Email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Email, setParent2Email] = useState(values[input]);
        formValues.parent2Email = parent2Email;
        formErrors.parent2Email = null;
        return <InputEmail name={input} placeholder='Введите почту второго родителя / опекуна'
                           fieldName='Почта второго родителя / опекуна' formErrors={formErrors.parent2Email}
                           value={parent2Email}
                           setValue={setParent2Email}
        />
      }
      case 'agreement': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreement, setAgreement] = useState(values[input]);
        formValues.agreement = agreement;
        formErrors.agreement = null;
        return <InputFile name={input} accept='.pdf' formErrors={formErrors.agreement}
                          fieldName='Согласие на обработку персональных данных*'
                          setValue={setAgreement}
        />
      }
      case 'howToKnow': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [howToKnow, setHowToKnow] = useState(values[input]);
        formValues.howToKnow = howToKnow;
        formErrors.howToKnow = null;
        return <InputDropdown name={input} placeholder='Расскажжите откуда вы узнали об ЭМШ'
                              fieldName='Откуда вы узнали об ЭМШ' formErrors={formErrors.howToKnow}
                              values={['От друзей', 'Из социальных сетей', 'На дополнительных курсах']}
                              setValue={setHowToKnow}/>
      }
      case 'mailing': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [mailing, setMailing] = useState(true);
        formValues.mailing = mailing;
        formErrors.mailing = null;
        return <InputCheckbox name={input} fieldName='Согласие на получение рассылки' initialChecked={true}
                              formErrors={formErrors.mailing}
                              setValue={setMailing}/>
      }
      case 'wasPupil': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [wasPupil, setWasPupil] = useState(true);
        formValues.wasPupil = wasPupil;
        formErrors.wasPupil = null;
        return <InputCheckbox name={input} fieldName='Был ли учеником ЭМШ' initialChecked={true}
                              formErrors={formErrors.wasPupil}
                              setValue={setWasPupil}/>
      }

      case 'courseFile': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [courseFile, setCourseFile] = useState(values[input]);
        formValues.courseFile = courseFile;
        formErrors.courseFile = null;
        return <InputFile name={input} accept='.xls, .xlsx, .csv'
                          fieldName='Добавить курс*'
                          formErrors={formErrors.courseFile}
                          setValue={setCourseFile}
        />
      }

      case 'newsTitle': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsTitle, setNewsTitle] = useState(undefined);
        formValues.newsTitle = newsTitle;
        formErrors.newsTitle = null;
        return <InputNewsTitle name={input} placeholder='Введите заголовок новости' formErrors={formErrors.newsTitle}
                               fieldName='Заголовок новости*'
                               value={newsTitle}
                               setValue={setNewsTitle}
        />
      }
      case 'newsPhoto': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsPhoto, setNewsPhoto] = useState();
        formValues.newsPhoto = newsPhoto;
        formErrors.newsPhoto = null;
        return <InputNewsPhoto name={input}
                               fieldName='Фотография новости' formErrors={formErrors.newsPhoto}
                               value={newsPhoto}
                               setValue={setNewsPhoto}
                               accept='image/png, image/gif, image/jpeg, image/jpg'
        />
      }
      case 'newsDescription': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsDescription, setNewsDescription] = useState(undefined);
        formValues.newsDescription = newsDescription;
        formErrors.newsDescription = null;
        return <InputNewsDescription name={input} placeholder='Введите текст новости'
                                     formErrors={formErrors.newsDescription}
                                     fieldName='Описание новости*'
                                     value={newsDescription}
                                     setValue={setNewsDescription}
        />
      }

      case 'classOver': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [classOver, setClassOver] = useState(undefined);
        formValues.classOver = classOver;
        formErrors.classOver = null;
        return <InputClass name={input} placeholder='Введите номер класса, который вы заканчиваете в этом году'
                           fieldName='Номер класса*' formErrors={formErrors.classOver}
                           value={classOver}
                           setValue={setClassOver}
        />
      }
      case 'city': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [city, setCity] = useState(undefined);
        formValues.city = city;
        formErrors.city = null;
        return <InputText name={input} placeholder='Введите название города' formErrors={formErrors.city}
                          fieldName='Название города*'
                          value={city}
                          setValue={setCity}
        />
      }
      case 'format': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [format, setFormat] = useState(undefined);
        formValues.format = format;
        formErrors.format = null;
        return <InputDropdown name={input} placeholder='Выберете формат обучения в ЭМШ' formErrors={formErrors.format}
                              fieldName='Формат обучения в ЭМШ*'
                              values={['Очный', 'Онлайн (я не из Москвы)']}
                              setValue={setFormat}/>
      }
      case 'agreementAb': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreementAb, setAgreementAb] = useState(undefined);
        formValues.agreementAb = agreementAb;
        formErrors.agreementAb = null;
        return <InputCheckbox name={input} fieldName='Согласие на обработку персональных данных*' initialChecked={true}
                              setValue={setAgreementAb} formErrors={formErrors.agreementAb} required={true}/>
      }

      default:
        console.log('There is no such field in form')
        return <input value={input}/>
    }
  }

  return (<form className={style.form} onSubmit={onSubmit}>
    {inputs.map((input) => (showInput(input)))}

    <ButtonSubmit text={buttonText}/>
  </form>);
};

export default Form;