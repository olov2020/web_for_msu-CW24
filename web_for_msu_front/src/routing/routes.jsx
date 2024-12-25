import {
  ABOUT_ROUTE,
  ACCOUNT_ROUTE,
  ADD_NEW_COURSE_ROUTE,
  ADMIN_ROUTE,
  ALL_COURSES_ROUTE,
  COURSES_ITEM_ROUTE,
  COURSES_SELECT_ROUTE,
  CREATE_NEWS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MARKS_ROUTE,
  MY_COURSES_ROUTE,
  NEWS_ITEM_ROUTE,
  NEWS_ROUTE,
  NOT_FOUND_ROUTE,
  ADMIN_LISTS_ROUTE,
  REGISTRATION_PUPIL_ROUTE,
  REGISTRATION_TEACHER_ROUTE,
  SCHEDULE_ROUTE,
  ADMIN_MARKS_ROUTE,
  EVENTS_TESTS_ROUTE,
  EVENTS_OPEN_CHAMPIONSHIP_ROUTE,
  EVENTS_CONTEST_SCIENTIFIC_WORKS_ROUTE,
  EVENTS_RESIDENTIAL_SCHOOL_ROUTE,
  EVENTS_SUMMER_SCHOOL_ROUTE,
  EVENTS_SUMMER_CAMP_ROUTE,
} from "./consts.js";
import Home from "../pages/home/Home.jsx";
import NotFound from "../pages/notFound/NotFound.jsx";
import Login from "../pages/login/Login.jsx";
import RegistrationPupil from "../pages/registration/RegistrationPupil.jsx";
import RegistrationTeacher from "../pages/registration/RegistrationTeacher.jsx";
import Account from "../pages/account/Account.jsx";
import Schedule from "../pages/schedule/Schedule.jsx";
import Courses from "../pages/courses/Courses.jsx";
import AddNewCourse from "../pages/courses/addNewCourse/AddNewCourse.jsx";
import News from "../pages/news/News.jsx";
import NewsCreate from "../pages/news/newsCreate/NewsCreate.jsx";
import NewsItem from "../pages/news/newsItem/NewsItem.jsx";
import CourseItem from "../pages/courses/courseItem/CourseItem.jsx";
import About from "../pages/about/About.jsx";
import AdminPanel from "../pages/adminPanel/AdminPanel.jsx";
import Marks from "../pages/adminPanel/marks/Marks.jsx";
import ListOfPeople from "../pages/adminPanel/listsOf/ListOfPeople.jsx";
import CoursesSelect from "../pages/courses/coursesSelect/CoursesSelect.jsx";
import EventsTests from "../pages/events/tests/EventsTests.jsx";
import EventsOpenChampionship from "../pages/events/openChampionship/EventsOpenChampionship.jsx";
import ContestScientificWorks from "../pages/events/contestScientificWorks/ContestScientificWorks.jsx";
import ResidentialSchool from "../pages/events/residentialSchool/ResidentialSchool.jsx";
import SummerSchool from "../pages/events/summerSchool/SummerSchool.jsx";
import SummerCamp from "../pages/events/summerCamp/SummerCamp.jsx";

export const publicRoutes = [
  {
    path: NOT_FOUND_ROUTE,
    Element: <NotFound/>,
  },
  {
    path: HOME_ROUTE,
    Element: <Home/>,
  },
  {
    path: LOGIN_ROUTE,
    Element: <Login/>,
  },
  {
    path: REGISTRATION_PUPIL_ROUTE,
    Element: <RegistrationPupil/>,
  },
  {
    path: REGISTRATION_TEACHER_ROUTE,
    Element: <RegistrationTeacher/>,
  },
  {
    path: ALL_COURSES_ROUTE,
    Element: <Courses/>,
  },
  {
    path: NEWS_ROUTE,
    Element: <News/>,
  },
  {
    path: NEWS_ITEM_ROUTE,
    Element: <NewsItem/>,
  },
  {
    path: COURSES_ITEM_ROUTE,
    Element: <CourseItem/>,
  },
  {
    path: ABOUT_ROUTE,
    Element: <About/>,
  },
  {
    path: EVENTS_TESTS_ROUTE,
    Element: <EventsTests/>,
  },
  {
    path: EVENTS_OPEN_CHAMPIONSHIP_ROUTE,
    Element: <EventsOpenChampionship/>,
  },
  {
    path: EVENTS_CONTEST_SCIENTIFIC_WORKS_ROUTE,
    Element: <ContestScientificWorks/>,
  },
  {
    path: EVENTS_RESIDENTIAL_SCHOOL_ROUTE,
    Element: <ResidentialSchool/>,
  },
  {
    path: EVENTS_SUMMER_SCHOOL_ROUTE,
    Element: <SummerSchool/>,
  },
  {
    path: EVENTS_SUMMER_CAMP_ROUTE,
    Element: <SummerCamp/>,
  },
]

export const authRoutes = [
  {
    path: ACCOUNT_ROUTE,
    Element: <Account/>,
  },
  {
    path: MY_COURSES_ROUTE,
    Element: <Courses/>,
  },
  {
    path: SCHEDULE_ROUTE,
    Element: <Schedule/>,
  },
  {
    path: COURSES_SELECT_ROUTE,
    Element: <CoursesSelect/>,
  },
]

export const newsmakerRoutes = [
  {
    path: CREATE_NEWS_ROUTE,
    Element: <NewsCreate/>,
  },
]

export const coursemakerRoutes = [
  {
    path: ADD_NEW_COURSE_ROUTE,
    Element: <AddNewCourse/>,
  },
]

export const marksmakerRoutes = [
  {
    path: MARKS_ROUTE,
    Element: <Marks/>,
  },
]

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Element: <AdminPanel/>,
  },
  {
    path: ADMIN_LISTS_ROUTE,
    Element: <ListOfPeople/>,
  },
  {
    path: ADMIN_MARKS_ROUTE,
    Element: <Marks/>,
  },
]