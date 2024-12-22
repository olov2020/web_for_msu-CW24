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

  const formValues = useState({})
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
    return requiredValues[type].every(item => formValues[item] !== undefined && formValues[item] !== null);
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
        return <InputEmail name={input} value={email} setValue={setEmail}
                           placeholder='Введите вашу почту' fieldName='Почта*'
        />
      }
      case 'password': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [password, setPassword] = useState(values[input]);
        formValues.password = password;
        return <InputPassword name={input} placeholder='Введите ваш пароль'
                              fieldName='Пароль*'
                              value={password} setValue={setPassword}
        />
      }
      case 'newPassword': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newPassword, setNewPassword] = useState(values[input]);
        formValues.newPassword = newPassword;
        return <InputPassword name={input} placeholder='Введите новый пароль'
                              fieldName='Новый пароль'
                              value={newPassword} setValue={setNewPassword}
        />
      }
      case 'photo': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [photo, setPhoto] = useState(values[input]);
        formValues.photo = photo;
        return <InputPhoto setValue={setPhoto}
                           name={input} accept='image/png, image/gif, image/jpeg, image/jpg'
                           fieldName='Выберете фото профиля'
        />
      }
      case 'name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [name, setName] = useState(values[input]);
        formValues.name = name;
        return <InputName name={input} placeholder='Введите свое имя'
                          fieldName='Имя*'
                          value={name} setValue={setName}
        />
      }
      case 'surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [surname, setSurname] = useState(values[input]);
        formValues.surname = surname;
        return <InputName name={input} placeholder='Введите свою фамилию'
                          fieldName='Фамилия*'
                          value={surname} setValue={setSurname}
        />
      }
      case 'lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [lastname, setLastname] = useState(values[input]);
        formValues.lastname = lastname;
        return <InputName name={input} placeholder='Введите свое отчество'
                          fieldName='Отчество'
                          value={lastname} setValue={setLastname}
        />
      }
      case 'birthDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [birthDate, setBirthDate] = useState(values[input]);
        formValues.birthDate = birthDate;
        return <InputDate name={input}
                          fieldName='Дата рождения*'
                          value={birthDate} setValue={setBirthDate}
        />
      }
      case 'phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [phone, setPhone] = useState(values[input]);
        formValues.phone = phone;
        return <InputPhone name={input} placeholder='Введите свой номер телефона'
                           fieldName='Телефон*'
                           value={phone} setValue={setPhone}
        />
      }
      case 'school': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [school, setSchool] = useState(values[input]);
        formValues.school = school;
        return <InputText name={input} placeholder='Введите название своей школы'
                          fieldName='Школа*'
                          value={school} setValue={setSchool}
        />
      }
      case 'schoolEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [schoolEndDate, setSchoolEndDate] = useState(values[input]);
        formValues.schoolEndDate = schoolEndDate;
        return <InputYear name={input} placeholder='Введите год окончания школы'
                          fieldName='Год окончания школы*'
                          value={schoolEndDate}
                          setValue={setSchoolEndDate}
        />
      }
      case 'university': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [university, setUniversity] = useState(values[input]);
        formValues.university = university;
        return <InputText name={input} placeholder='Введите название университета'
                          fieldName='Университет*'
                          value={university} setValue={setUniversity}
        />
      }
      case 'universityEndDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [universityEndDate, setUniversityEndDate] = useState(values[input]);
        formValues.universityEndDate = universityEndDate;
        return <InputYear name={input} placeholder='Введите год окончания университета'
                          fieldName='Год окончания университета*'
                          value={universityEndDate}
                          setValue={setUniversityEndDate}
        />
      }
      case 'registrationAddress': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [registrationAddress, setRegistrationAddress] = useState(values[input]);
        formValues.registrationAddress = registrationAddress;
        return <InputText name={input} placeholder='Введите свой адрес регистрации'
                          fieldName='Адрес регистрации*'
                          value={registrationAddress}
                          setValue={setRegistrationAddress}
        />
      }
      case 'work': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [work, setWork] = useState(values[input]);
        formValues.work = work;
        return <InputText name={input} placeholder='Введите свое место работы'
                          fieldName='Место работы'
                          value={work} setValue={setWork}
        />
      }
      case 'telegram': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [telegram, setTelegram] = useState(values[input]);
        formValues.telegram = telegram;
        return <InputMessenger name={input} placeholder='Введите свой ник в Телеграме'
                               fieldName='Телеграм'
                               value={telegram} setValue={setTelegram}
        />
      }
      case 'vk': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [vk, setVk] = useState(values[input]);
        formValues.vk = vk;
        return <InputMessenger name={input} placeholder='Введите свой ник в ВК'
                               fieldName='ВК'
                               value={vk} setValue={setVk}
        />
      }
      case 'parent1Name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Name, setParent1Name] = useState(values[input]);
        formValues.parent1Name = parent1Name;
        return <InputName name={input} placeholder='Введите имя первого родителя / опекуна'
                          fieldName='Имя первого родителя / опекуна*'
                          value={parent1Name}
                          setValue={setParent1Name}
        />
      }
      case 'parent1Surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Surname, setParent1Surname] = useState(values[input]);
        formValues.parent1Surname = parent1Surname;
        return <InputName name={input} placeholder='Введите фамилию первого родителя / опекуна'
                          fieldName='Фамилия первого родителя / опекуна*'
                          value={parent1Surname}
                          setValue={setParent1Surname}
        />
      }
      case 'parent1Lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Lastname, setParent1Lastname] = useState(values[input]);
        formValues.parent1Lastname = parent1Lastname;
        return <InputName name={input} placeholder='Введите отчество первого родителя / опекуна'
                          fieldName='Отчество первого родителя / опекуна'
                          value={parent1Lastname}
                          setValue={setParent1Lastname}
        />
      }
      case 'parent1Phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Phone, setParent1Phone] = useState(values[input]);
        formValues.parent1Phone = parent1Phone;
        return <InputPhone name={input} placeholder='Введите телефон первого родителя / опекуна'
                           fieldName='Телефон первого родителя / опекуна*'
                           value={parent1Phone}
                           setValue={setParent1Phone}
        />
      }
      case 'parent1Email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Email, setParent1Email] = useState(values[input]);
        formValues.parent1Email = parent1Email;
        return <InputEmail name={input} placeholder='Введите почту первого родителя / опекуна'
                           fieldName='Почта первого родителя / опекуна*'
                           value={parent1Email}
                           setValue={setParent1Email}
        />
      }
      case 'parent2Name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Name, setParent2Name] = useState(values[input]);
        formValues.parent2Name = parent2Name;
        return <InputName name={input} placeholder='Введите имя второго родителя / опекуна'
                          fieldName='Имя второго родителя / опекуна'
                          value={parent2Name}
                          setValue={setParent2Name}
        />
      }
      case 'parent2Surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Surname, setParent2Surname] = useState(values[input]);
        formValues.parent2Surname = parent2Surname;
        return <InputName name={input} placeholder='Введите фамилию второго родителя / опекуна'
                          fieldName='Фамилия второго родителя / опекуна'
                          value={parent2Surname}
                          setValue={setParent2Surname}
        />
      }
      case 'parent2Lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Lastname, setParent2Lastname] = useState(values[input]);
        formValues.parent2Lastname = parent2Lastname;
        return <InputName name={input} placeholder='Введите отчество второго родителя / опекуна'
                          fieldName='Отчество второго родителя / опекуна'
                          value={parent2Lastname}
                          setValue={setParent2Lastname}
        />
      }
      case 'parent2Phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Phone, setParent2Phone] = useState(values[input]);
        formValues.parent2Phone = parent2Phone;
        return <InputPhone name={input} placeholder='Введите телефон второго родителя / опекуна'
                           fieldName='Телефон второго родителя / опекуна'
                           value={parent2Phone}
                           setValue={setParent2Phone}
        />
      }
      case 'parent2Email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Email, setParent2Email] = useState(values[input]);
        formValues.parent2Email = parent2Email;
        return <InputEmail name={input} placeholder='Введите почту второго родителя / опекуна'
                           fieldName='Почта второго родителя / опекуна'
                           value={parent2Email}
                           setValue={setParent2Email}
        />
      }
      case 'agreement': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreement, setAgreement] = useState(values[input]);
        formValues.agreement = agreement;
        return <InputFile name={input} accept='.pdf'
                          fieldName='Согласие на обработку персональных данных*'
                          setValue={setAgreement}
        />
      }
      case 'howToKnow': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [howToKnow, setHowToKnow] = useState(values[input]);
        formValues.howToKnow = howToKnow;
        return <InputDropdown name={input} placeholder='Расскажжите откуда вы узнали об ЭМШ'
                              fieldName='Откуда вы узнали об ЭМШ'
                              values={['От друзей', 'Из социальных сетей', 'На дополнительных курсах']}
                              setValue={setHowToKnow}/>
      }
      case 'mailing': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [mailing, setMailing] = useState(true);
        formValues.mailing = mailing;
        return <InputCheckbox name={input} fieldName='Согласие на получение рассылки' initialChecked={true}
                              setValue={setMailing}/>
      }
      case 'wasPupil': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [wasPupil, setWasPupil] = useState(true);
        formValues.wasPupil = wasPupil;
        return <InputCheckbox name={input} fieldName='Был ли учеником ЭМШ' initialChecked={true}
                              setValue={setWasPupil}/>
      }

      case 'courseFile': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [courseFile, setCourseFile] = useState(values[input]);
        formValues.courseFile = courseFile;
        return <InputFile name={input} accept='.xls, .xlsx, .csv'
                          fieldName='Добавить курс*'
                          setValue={setCourseFile}
        />
      }

      case 'newsTitle': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsTitle, setNewsTitle] = useState(undefined);
        formValues.newsTitle = newsTitle;
        return <InputNewsTitle name={input} placeholder='Введите заголовок новости'
                               fieldName='Заголовок новости*'
                               value={newsTitle}
                               setValue={setNewsTitle}
        />
      }
      case 'newsPhoto': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsPhoto, setNewsPhoto] = useState();
        formValues.newsPhoto = newsPhoto;
        return <InputNewsPhoto name={input}
                               fieldName='Фотография новости'
                               value={newsPhoto}
                               setValue={setNewsPhoto}
                               accept='image/png, image/gif, image/jpeg, image/jpg'
        />
      }
      case 'newsDescription': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newsDescription, setNewsDescription] = useState(undefined);
        formValues.newsDescription = newsDescription;
        return <InputNewsDescription name={input} placeholder='Введите текст новости'
                                     fieldName='Описание новости*'
                                     value={newsDescription}
                                     setValue={setNewsDescription}
        />
      }

      case 'classOver': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [classOver, setClassOver] = useState(undefined);
        formValues.classOver = classOver;
        return <InputClass name={input} placeholder='Введите номер класса, который вы заканчиваете в этом году'
                                     fieldName='Номер класса*'
                                     value={classOver}
                                     setValue={setClassOver}
        />
      }
      case 'city': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [city, setCity] = useState(undefined);
        formValues.city = city;
        return <InputText name={input} placeholder='Введите название города'
                                     fieldName='Название города*'
                                     value={city}
                                     setValue={setCity}
        />
      }
      case 'format': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [format, setFormat] = useState(undefined);
        formValues.format = format;
        return <InputDropdown name={input} placeholder='Выберете формат обучения в ЭМШ'
                              fieldName='Формат обучения в ЭМШ*'
                              values={['Очный', 'Онлайн (я не из Москвы)']}
                              setValue={setFormat}/>
      }
      case 'agreementAb': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreementAb, setAgreementAb] = useState(undefined);
        formValues.agreementAb = agreementAb;
        return <InputCheckbox name={input} fieldName='Согласие на обработку персональных данных*' initialChecked={true}
                                  setValue={setAgreementAb}/>
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