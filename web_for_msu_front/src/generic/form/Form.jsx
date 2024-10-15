import style from './form.module.css'
import InputEmail from "./inputs/InputEmail.jsx";
import InputPassword from "./inputs/InputPassword.jsx";
import ButtonSubmit from "./submit/ButtonSubmit.jsx";
import {pupilRegistration, teacherRegistration, userLogin} from "../../api/userApi.js";
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
const Form = ({inputs = [], buttonText, type}) => {

  const formValues = useState({})

  const onClick = () => {
    if (type === 'login') {
      userLogin();
    } else if (type === 'pupil_registration') {
      pupilRegistration(Object.fromEntries(formValues));
    } else if (type === 'teacher_registration') {
      teacherRegistration(Object.fromEntries(formValues));
    } else {
      console.error('Invalid type:', type);
    }
  }

  const showInput = (input) => {
    switch (input) {
      case 'email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [email, setEmail] = useState('');
        formValues.email = email;
        return <InputEmail name={input} value={email} setValue={setEmail} placeholder='Почта'/>
      }
      case 'password': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [password, setPassword] = useState('');
        formValues.password = password;
        return <InputPassword value={password} setValue={setPassword}/>
      }
      case 'photo': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [photo, setPhoto] = useState('');
        formValues.photo = photo;
        return <InputPhoto setValue={setPhoto}
                           name={input} accept='image/png, image/gif, image/jpeg, image/jpg'
                           text='Выберете фото профиля'/>
      }
      case 'name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [name, setName] = useState('');
        formValues.name = name;
        return <InputName name={input} placeholder='Имя' value={name} setValue={setName}/>
      }
      case 'surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [surname, setSurname] = useState('');
        formValues.surname = surname;
        return <InputName name={input} placeholder='Фамилия' value={surname} setValue={setSurname}/>
      }
      case 'lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [lastname, setLastname] = useState('');
        formValues.lastname = lastname;
        return <InputName name={input} placeholder='Отчество' value={lastname} setValue={setLastname}/>
      }
      case 'birthDate': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [birthDate, setBirthDate] = useState('');
        formValues.birthDate = birthDate;
        return <InputDate name={input} placeholder='День рождения' value={birthDate} setValue={setBirthDate}/>
      }
      case 'phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [phone, setPhone] = useState('');
        formValues.phone = phone;
        return <InputPhone name={input} placeholder='Телефон' value={phone} setValue={setPhone}/>
      }
      case 'school': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [school, setSchool] = useState('');
        formValues.school = school;
        return <InputText name={input} placeholder='Школа' value={school} setValue={setSchool}/>
      }
      case 'school_end_date': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [schoolEndDate, setSchoolEndDate] = useState('');
        formValues.schoolEndDate = schoolEndDate;
        return <InputYear name={input} placeholder='Год окончания школы' value={schoolEndDate}
                          setValue={setSchoolEndDate}/>
      }
      case 'university': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [university, setUniversity] = useState('');
        formValues.university = university;
        return <InputText name={input} placeholder='Университет' value={university} setValue={setUniversity}/>
      }
      case 'university_end_date': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [universityEndDate, setUniversityEndDate] = useState('');
        formValues.universityEndDate = universityEndDate;
        return <InputYear name={input} placeholder='Год окончания университета' value={universityEndDate}
                          setValue={setUniversityEndDate}/>
      }
      case 'registration_address': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [registrationAddress, setRegistrationAddress] = useState('');
        formValues.registrationAddress = registrationAddress;
        return <InputText name={input} placeholder='Адрес регистрации' value={registrationAddress}
                          setValue={setRegistrationAddress}/>
      }
      case 'work': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [work, setWork] = useState('');
        formValues.work = work;
        return <InputText name={input} placeholder='Место работы' value={work} setValue={setWork}/>
      }
      case 'telegram': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [telegram, setTelegram] = useState('');
        formValues.telegram = telegram;
        return <InputMessenger name={input} placeholder='Телеграм' value={telegram} setValue={setTelegram}/>
      }
      case 'vk': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [vk, setVk] = useState('');
        formValues.vk = vk;
        return <InputMessenger name={input} placeholder='ВКонтакте' value={vk} setValue={setVk}/>
      }
      case 'parent1_name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Name, setParent1Name] = useState('');
        formValues.parent1Name = parent1Name;
        return <InputName name={input} placeholder='Имя первого родителя / опекуна' value={parent1Name}
                          setValue={setParent1Name}/>
      }
      case 'parent1_surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Surname, setParent1Surname] = useState('');
        formValues.parent1Surname = parent1Surname;
        return <InputName name={input} placeholder='Фамилия первого родителя / опекуна' value={parent1Surname}
                          setValue={setParent1Surname}/>
      }
      case 'parent1_lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Lastname, setParent1Lastname] = useState('');
        formValues.parent1Lastname = parent1Lastname;
        return <InputName name={input} placeholder='Отчество первого родителя / опекуна' value={parent1Lastname}
                          setValue={setParent1Lastname}/>
      }
      case 'parent1_phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Phone, setParent1Phone] = useState('');
        formValues.parent1Phone = parent1Phone;
        return <InputPhone name={input} placeholder='Телефон первого родителя / опекуна' value={parent1Phone}
                           setValue={setParent1Phone}/>
      }
      case 'parent1_email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent1Email, setParent1Email] = useState('');
        formValues.parent1Email = parent1Email;
        return <InputEmail name={input} placeholder='Почта первого родителя / опекуна' value={parent1Email}
                           setValue={setParent1Email}/>
      }
      case 'parent2_name': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Name, setParent2Name] = useState('');
        formValues.parent2Name = parent2Name;
        return <InputName name={input} placeholder='Имя второго родителя / опекуна' value={parent2Name}
                          setValue={setParent2Name}/>
      }
      case 'parent2_surname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Surname, setParent2Surname] = useState('');
        formValues.parent2Surname = parent2Surname;
        return <InputName name={input} placeholder='Фамилия второго родителя / опекуна' value={parent2Surname}
                          setValue={setParent2Surname}/>
      }
      case 'parent2_lastname': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Lastname, setParent2Lastname] = useState('');
        formValues.parent2Lastname = parent2Lastname;
        return <InputName name={input} placeholder='Отчество второго родителя / опекуна' value={parent2Lastname}
                          setValue={setParent2Lastname}/>
      }
      case 'parent2_phone': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Phone, setParent2Phone] = useState('');
        formValues.parent2Phone = parent2Phone;
        return <InputPhone name={input} placeholder='Телефон второго родителя / опекуна' value={parent2Phone}
                           setValue={setParent2Phone}/>
      }
      case 'parent2_email': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [parent2Email, setParent2Email] = useState('');
        formValues.parent2Email = parent2Email;
        return <InputEmail name={input} placeholder='Почта второго родителя / опекуна' value={parent2Email}
                           setValue={setParent2Email}/>
      }
      case 'agreement': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [agreement, setAgreement] = useState('');
        formValues.agreement = agreement;
        return <InputFile name={input} accept='.pdf' text='Согласие на обработку персональных данных'
                          setValue={setAgreement}/>
      }
      case 'how_to_know': {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [howToKnow, setHowToKnow] = useState('');
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