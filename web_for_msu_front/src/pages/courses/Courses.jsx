import {useEffect, useState} from "react";
import CourseCard from "./courseCard/CourseCard.jsx";
import {NOT_FOUND_ROUTE} from "../../routing/consts.js";
import {redirect} from "react-router-dom";
import {getAllCourses, getMyCourses} from "../../api/coursesApi.js";

const Courses = () => {

  const url = window.location.pathname;
  const [isMyCourses, setIsMyCourses] = useState(false);
  const [coursesAll, setCoursesAll] = useState({
    "2024": [
      {
        "additional_info": "Желательно наличие у школьников своих ноутбуков",
        "additional_info_for_auditory": "Необходима компьютерная аудитория",
        "assessment": "Приблизительное распределение веса различных элементов контроля:\n- Летучки - 20%\n- Проекты - 30%\n- Экзамен - 50%",
        "auditory": null,
        "course_features": "Курс нацелен не только на запоминание теории и языка программирования, но также и на применение знаний в решении задач и даже написании проектов.",
        "course_format": "В начале занятия проводится летучка - краткий теоретический опрос по теме прошлого урока. После разбора летучки начинается основная пара. Сначала рассказывается теоретический материал, затем идет блок практики.",
        "course_objectives": "К задачам курса можно отнести:\n- Изучение python\n- Развитие у школьников умения нестандартно мыслить и решать трудоемкие задачи\n- Обучение некоторым полезным алгоритмам для решения типовых задач",
        "course_purpose": "Целью курса является обучение школьников базовым навыкам программирования на примере языка программирования python",
        "crediting": "зачётный для всех классов",
        "direction": "Третий Путь",
        "emsh_grades": "9 - 11",
        "formulas": [
          {
            "coefficient": 0.65,
            "name": "домашняя работа"
          },
          {
            "coefficient": 0.35,
            "name": "экзамен"
          },
          {
            "coefficient": 1,
            "name": "Баллы"
          }
        ],
        "id": 1,
        "lesson_time": "Вторник 17:20 - 18:40",
        "lessons": [
          {
            "additional_info": "Для того чтобы внутри ячейки сделать разрыв строки, нужно нажать Alt+Enter",
            "date": "2024-10-03",
            "lesson_number": 1,
            "plan": "Знакомство со школьниками, рассказ о себе, целях курса и установка необходимого по, (проведение теста, если будет избыток желающих)\nРассказ о веб-сервисе, который основан на Git. Рассказ о git. Создание собственного аккаунта",
            "theme": "Введение"
          },
          {
            "additional_info": "После вставки таблицы из Word, выберите \"Использовать форматы конечных ячеек\"",
            "date": "2024-10-10",
            "lesson_number": 2,
            "plan": "Обучение основам языка python - ввод и вывод информации, типы данных",
            "theme": "Основы python"
          },
          {
            "additional_info": null,
            "date": "2024-10-17",
            "lesson_number": 3,
            "plan": "Рассказ о различных нестандартных операциях (xor, возведение в степень, извлечение корня через степень и т.д.) и условиях",
            "theme": "Операции и условия"
          },
          {
            "additional_info": null,
            "date": "2024-10-24",
            "lesson_number": 4,
            "plan": "Цикл for, операторы break и continue",
            "theme": "Цикл for"
          },
          {
            "additional_info": null,
            "date": "2024-10-31",
            "lesson_number": 5,
            "plan": "Вложенные условия внутри циклов и в основной программе",
            "theme": "Вложенные условия"
          },
          {
            "additional_info": null,
            "date": "2024-11-07",
            "lesson_number": 6,
            "plan": "Рассказ об устройстве программы, ее частях и функциях, а также лямбда-функциях. Изучение рекурсии",
            "theme": "Функции"
          },
          {
            "additional_info": null,
            "date": "2024-11-14",
            "lesson_number": 7,
            "plan": "Цикл while, вложенные циклы",
            "theme": "Цикл while"
          },
          {
            "additional_info": null,
            "date": "2024-11-21",
            "lesson_number": 8,
            "plan": "Рассказ о строках и их методах, а также об операциях с ними",
            "theme": "Строки"
          },
          {
            "additional_info": null,
            "date": "2024-11-28",
            "lesson_number": 9,
            "plan": "Регулярные выражения",
            "theme": "Строки2"
          },
          {
            "additional_info": null,
            "date": "2024-12-05",
            "lesson_number": 10,
            "plan": "Знакомство со списками, методами списков",
            "theme": "Списки"
          },
          {
            "additional_info": null,
            "date": "2024-12-12",
            "lesson_number": 11,
            "plan": "Изучение двумерных списков",
            "theme": "Двумерные списки"
          },
          {
            "additional_info": null,
            "date": "2024-12-19",
            "lesson_number": 12,
            "plan": "Рассказ о новых структурах данных",
            "theme": "Множества, словари и set"
          },
          {
            "additional_info": null,
            "date": "2024-12-26",
            "lesson_number": 13,
            "plan": "Экзамен",
            "theme": "ЭКЗ"
          },
          {
            "additional_info": null,
            "date": "2025-01-30",
            "lesson_number": 14,
            "plan": "Повторение материала 1 полугодия",
            "theme": "Повторение"
          },
          {
            "additional_info": null,
            "date": "2025-02-06",
            "lesson_number": 15,
            "plan": "Изучение алгебры логики и путей ее решения с помощью python",
            "theme": "Алгебра логики"
          },
          {
            "additional_info": null,
            "date": "2025-02-13",
            "lesson_number": 16,
            "plan": "Рассказ о принципе работы сортировок, знакомство с разными вариациями, быстрая сортировка",
            "theme": "Сортировки"
          },
          {
            "additional_info": null,
            "date": "2025-02-20",
            "lesson_number": 17,
            "plan": "Знакомство с бинарным поиском, рассказ про тернарный поиск",
            "theme": "Бинарный поиск"
          },
          {
            "additional_info": null,
            "date": "2025-02-27",
            "lesson_number": 18,
            "plan": "Теория по тому, как оценивать сложность алгоритмов",
            "theme": "Сложность алгоритмов"
          },
          {
            "additional_info": null,
            "date": "2025-03-06",
            "lesson_number": 19,
            "plan": "Разбор 16 задания ЕГЭ, повторение темы функций",
            "theme": "16 задание ЕГЭ"
          },
          {
            "additional_info": null,
            "date": "2025-03-13",
            "lesson_number": 20,
            "plan": "Разбор 15 задания ЕГЭ, повторение алгебры логики",
            "theme": "15 Задание ЕГЭ"
          },
          {
            "additional_info": null,
            "date": "2025-03-20",
            "lesson_number": 21,
            "plan": "Разбор 12 задания ЕГЭ, повторение темы строк\nРазбор 14 задания егэ, повторение базовых операций",
            "theme": "12, 14 Задания ЕГЭ"
          },
          {
            "additional_info": null,
            "date": "2025-03-27",
            "lesson_number": 22,
            "plan": "Разбор 17 задания ЕГЭ, чтение из файла",
            "theme": "17 Задание ЕГЭ"
          },
          {
            "additional_info": null,
            "date": "2025-04-03",
            "lesson_number": 23,
            "plan": "Разбор 18 задания ЕГЭ, изучение динамического программирования",
            "theme": "18 Задание ЕГЭ"
          },
          {
            "additional_info": null,
            "date": "2025-04-10",
            "lesson_number": 24,
            "plan": "Разбор 23 задания ЕГЭ, повторение темы динамического программирования",
            "theme": "23 задание ЕГЭ"
          },
          {
            "additional_info": null,
            "date": "2025-04-17",
            "lesson_number": 25,
            "plan": "Экзамен",
            "theme": "ЭКЗ"
          }
        ],
        "name": "Приручение python'а",
        "number_of_listeners": "от 10 до 20 человек",
        "platform_format": "Курс будет читаться очно. При возникновении внештатных ситуаций курс будет проводиться на платформе Discord",
        "selection": "Отбор на курс не предусмотрен.\nЕсли будет много желающих, будет проведено входное тестирование, включающее не только уровень знаний человека, но и его мотивацию изучать данный курс. В приоритете будут те школьники, который четко могут ответить на вопрос, зачем им программирование.",
        "short_description": "Курс о программировании на языке python\nВ рамках курса будут изучены ооп, различные структуры данных и некоторые полезные алгоритмы",
        "target_audience": "Курс предназначен для ребят, заинтересованных в том, чтобы попробовать программирование или же прокачать свои знания, изучив некоторые полезные алгоритмы.",
        "teachers": [
          "Иванов Иван Иванович"
        ]
      }
    ]
  });

  /*useEffect(() => {

    // Convert the dictionary to an array of key-value pairs
    const keyValuePairs = Object.entries(coursesAll);

// Reverse the array of key-value pairs
    keyValuePairs.reverse();

// Convert the reversed array back to a dictionary
    const reversedDict = Object.fromEntries(keyValuePairs);

    console.log(reversedDict)
    setCoursesAll(reversedDict);
    /!*function sortObjectByKey() {
      // Get an array of the object's keys
      const keys = Object.keys(coursesAll);

      // Sort the keys alphabetically (or according to your custom sorting logic)
      keys.sort().reverse();  //For numerical keys: keys.sort((a, b) => parseInt(a) - parseInt(b));
      console.log(keys)

      // Map the sorted keys back to their values, creating a new array of [key, value] pairs.
      const sortedEntries = keys.map(key => [key, coursesAll[key]]);

      // Convert the array of [key, value] pairs back into an object (optional)
      console.log(Object.fromEntries(sortedEntries));
      setCoursesAll(Object.fromEntries(sortedEntries));
    }

    sortObjectByKey();*!/
  }, [])*/


  /*useEffect(() => {
    const getCourses = async () => {
      const data = url === '/courses/my' ?
        await getMyCourses() :
        url === '/courses/all' ?
          await getAllCourses() : undefined;
      setCoursesAll(data);
      console.log(data);
      setIsMyCourses(url === '/courses/my');
    }

    getCourses();
  }, [url]);*/


  return (
    <article>
      {
        url === ('/courses/my') || url === '/' ?
          <h1>Мои курсы</h1> :
          url === ('/courses/all') ?
            <h1>Все курсы</h1> :
            redirect(NOT_FOUND_ROUTE)
      }

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem 0',
        width: '90%',
      }}>
        {coursesAll ? Object.entries(coursesAll).map(([year, courses]) => (
            <div key={year}
                 style={{
                   display: 'flex',
                   flexDirection: 'column',
                   gap: '1rem 0',
                 }}
            >
              <h2>{year}</h2>
              {courses.map((courseData) => (
                <CourseCard key={courseData.id} year={year} courseData={courseData} isMyCourses={isMyCourses}/>
              ))}
            </div>
          )) :
          url === ('/courses/my') ?
            <h3>Вы не записаны ни на один курс</h3> :
            <h3>Нет доступных курсов</h3>
        }
      </div>
    </article>
  );
};

export default Courses;