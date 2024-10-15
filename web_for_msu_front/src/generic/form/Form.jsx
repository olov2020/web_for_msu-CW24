import style from './form.module.css'
import InputEmail from "./inputs/InputEmail.jsx";
import InputPassword from "./inputs/InputPassword.jsx";
import ButtonSubmit from "./submit/ButtonSubmit.jsx";
import {pupilRegistration, teacherRegistration, userChangeData, userChangePhoto, userLogin} from "../../api/userApi.js";
import InputFile from "./inputs/InputFile.jsx";
import InputName from "./inputs/InputName.jsx";
import InputDate from "./inputs/InputDate.jsx";
import InputPhone from "./inputs/InputPhone.jsx";
import InputText from "./inputs/InputText.jsx";
import InputYear from "./inputs/InputYear.jsx";
import InputMessenger from "./inputs/InputMessenger.jsx";
import InputDropdown from "./inputs/InputDropdown.jsx";
import InputCheckbox from "./inputs/InputCheckbox.jsx";
import {useState} from "react";
import InputPhoto from "./inputs/InputPhoto.jsx";

// eslint-disable-next-line react/prop-types
const Form = ({inputs = [], values = {}, buttonText, type}) => {

  const formValues = useState({})

  // TODO
  // add check for correct and required variables
  const onClick = () => {
    if (type === 'login') {
      userLogin(formValues.email, formValues.password);
    } else if (type === 'pupil_registration') {
      pupilRegistration(formValues);
    } else if (type === 'userChangePhoto') {
      userChangePhoto(formValues.photo);
    } else if (type === 'userChangeData') {
      userChangeData(formValues.name, formValues.surname, formValues.lastname, formValues.email, formValues.phone, formValues.school);
    } else {
      console.error('Invalid type:', type);
    }
  }

  const showInput = (input) => {
    switch (input) {
      case 'email': {
        console.log(values)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [email, setEmail] = useState(values[input]);
        formValues.email = email;
        return <InputEmail name={input} value={email} setValue={setEmail} placeholder='Почта'/>
      }
      case 'password': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [password, setPassword] = useState(values[input]);
        formValues.password = password;
        return <InputPassword name={input} placeholder='Пароль' value={password} setValue={setPassword}/>
      }
      case 'newPassword': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [newPassword, setNewPassword] = useState(values[input]);
        formValues.newPassword = newPassword;
        return <InputPassword name={input} placeholder='Новый пароль' value={newPassword} setValue={setNewPassword}/>
      }
      case 'photo': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [photo, setPhoto] = useState(values[input]);
        formValues.photo = photo;
        return <InputPhoto setValue={setPhoto}
                           name={input} accept='image/png, image/gif, image/jpeg, image/jpg'
                           text='Выберете фото профиля'/>
      }
      case 'name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [name, setName] = useState(values[input]);
        formValues.name = name;
        return <InputName name={input} placeholder='Имя' value={name} setValue={setName}/>
      }
      case 'surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [surname, setSurname] = useState(values[input]);
        formValues.surname = surname;
        return <InputName name={input} placeholder='Фамилия' value={surname} setValue={setSurname}/>
      }
      case 'lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [lastname, setLastname] = useState(values[input]);
        formValues.lastname = lastname;
        return <InputName name={input} placeholder='Отчество' value={lastname} setValue={setLastname}/>
      }
      case 'birthDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [birthDate, setBirthDate] = useState(values[input]);
        formValues.birthDate = birthDate;
        return <InputDate name={input} placeholder='День рождения' value={birthDate} setValue={setBirthDate}/>
      }
      case 'phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [phone, setPhone] = useState(values[input]);
        formValues.phone = phone;
        return <InputPhone name={input} placeholder='Телефон' value={phone} setValue={setPhone}/>
      }
      case 'school': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [school, setSchool] = useState(values[input]);
        formValues.school = school;
        return <InputText name={input} placeholder='Школа' value={school} setValue={setSchool}/>
      }
      case 'school_end_date': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [schoolEndDate, setSchoolEndDate] = useState(values[input]);
        formValues.schoolEndDate = schoolEndDate;
        return <InputYear name={input} placeholder='Год окончания школы' value={schoolEndDate}
                          setValue={setSchoolEndDate}/>
      }
      case 'university': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [university, setUniversity] = useState(values[input]);
        formValues.university = university;
        return <InputText name={input} placeholder='Университет' value={university} setValue={setUniversity}/>
      }
      case 'university_end_date': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [universityEndDate, setUniversityEndDate] = useState(values[input]);
        formValues.universityEndDate = universityEndDate;
        return <InputYear name={input} placeholder='Год окончания университета' value={universityEndDate}
                          setValue={setUniversityEndDate}/>
      }
      case 'registration_address': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [registrationAddress, setRegistrationAddress] = useState(values[input]);
        formValues.registrationAddress = registrationAddress;
        return <InputText name={input} placeholder='Адрес регистрации' value={registrationAddress}
                          setValue={setRegistrationAddress}/>
      }
      case 'work': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [work, setWork] = useState(values[input]);
        formValues.work = work;
        return <InputText name={input} placeholder='Место работы' value={work} setValue={setWork}/>
      }
      case 'telegram': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [telegram, setTelegram] = useState(values[input]);
        formValues.telegram = telegram;
        return <InputMessenger name={input} placeholder='Телеграм' value={telegram} setValue={setTelegram}/>
      }
      case 'vk': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [vk, setVk] = useState(values[input]);
        formValues.vk = vk;
        return <InputMessenger name={input} placeholder='ВКонтакте' value={vk} setValue={setVk}/>
      }
      case 'parent1_name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Name, setParent1Name] = useState(values[input]);
        formValues.parent1Name = parent1Name;
        return <InputName name={input} placeholder='Имя первого родителя / опекуна' value={parent1Name}
                          setValue={setParent1Name}/>
      }
      case 'parent1_surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Surname, setParent1Surname] = useState(values[input]);
        formValues.parent1Surname = parent1Surname;
        return <InputName name={input} placeholder='Фамилия первого родителя / опекуна' value={parent1Surname}
                          setValue={setParent1Surname}/>
      }
      case 'parent1_lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Lastname, setParent1Lastname] = useState(values[input]);
        formValues.parent1Lastname = parent1Lastname;
        return <InputName name={input} placeholder='Отчество первого родителя / опекуна' value={parent1Lastname}
                          setValue={setParent1Lastname}/>
      }
      case 'parent1_phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Phone, setParent1Phone] = useState(values[input]);
        formValues.parent1Phone = parent1Phone;
        return <InputPhone name={input} placeholder='Телефон первого родителя / опекуна' value={parent1Phone}
                           setValue={setParent1Phone}/>
      }
      case 'parent1_email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Email, setParent1Email] = useState(values[input]);
        formValues.parent1Email = parent1Email;
        return <InputEmail name={input} placeholder='Почта первого родителя / опекуна' value={parent1Email}
                           setValue={setParent1Email}/>
      }
      case 'parent2_name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Name, setParent2Name] = useState(values[input]);
        formValues.parent2Name = parent2Name;
        return <InputName name={input} placeholder='Имя второго родителя / опекуна' value={parent2Name}
                          setValue={setParent2Name}/>
      }
      case 'parent2_surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Surname, setParent2Surname] = useState(values[input]);
        formValues.parent2Surname = parent2Surname;
        return <InputName name={input} placeholder='Фамилия второго родителя / опекуна' value={parent2Surname}
                          setValue={setParent2Surname}/>
      }
      case 'parent2_lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Lastname, setParent2Lastname] = useState(values[input]);
        formValues.parent2Lastname = parent2Lastname;
        return <InputName name={input} placeholder='Отчество второго родителя / опекуна' value={parent2Lastname}
                          setValue={setParent2Lastname}/>
      }
      case 'parent2_phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Phone, setParent2Phone] = useState(values[input]);
        formValues.parent2Phone = parent2Phone;
        return <InputPhone name={input} placeholder='Телефон второго родителя / опекуна' value={parent2Phone}
                           setValue={setParent2Phone}/>
      }
      case 'parent2_email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Email, setParent2Email] = useState(values[input]);
        formValues.parent2Email = parent2Email;
        return <InputEmail name={input} placeholder='Почта второго родителя / опекуна' value={parent2Email}
                           setValue={setParent2Email}/>
      }
      case 'agreement': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreement, setAgreement] = useState(values[input]);
        formValues.agreement = agreement;
        return <InputFile name={input} accept='.pdf' text='Согласие на обработку персональных данных'
                          setValue={setAgreement}/>
      }
      case 'how_to_know': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [howToKnow, setHowToKnow] = useState(values[input]);
        formValues.howToKnow = howToKnow
        return <InputDropdown name={input} placeholder='Откуда вы узнали об ЭМШ'
                              values={['От друзей', 'Из социальных сетей', 'На дополнительных курсах']}
                              setValue={setHowToKnow}/>
      }
      case 'mailing': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [mailing, setMailing] = useState(true);
        formValues.mailing = mailing
        return <InputCheckbox name={input} placeholder='Согласие на получение рассылки' initialChecked={true}
                              required={false} setValue={setMailing}/>
      }
      case 'was_pupil': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [wasPupil, setWasPupil] = useState(true);
        formValues.wasPupil = wasPupil
        return <InputCheckbox name={input} placeholder='Был ли учеником ЭМШ' initialChecked={true}
                              required={false} setValue={setWasPupil}/>
      }
      default:
        console.log('There is no such field in form')
        return <input value={input}/>
    }
  }

  return (
    <form className={style.form}>
      {inputs.map((input) => (
        showInput(input)
      ))}

      <ButtonSubmit text={buttonText} onClick={onClick}/>
    </form>
  );
};

export default Form;