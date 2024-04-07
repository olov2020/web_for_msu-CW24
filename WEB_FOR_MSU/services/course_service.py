from datetime import datetime, timedelta

from openpyxl.reader.excel import load_workbook

from WEB_FOR_MSU import db
from WEB_FOR_MSU.forms.teacher_course import TeacherCourseForm
from WEB_FOR_MSU.forms.formula import FormulaForm
from WEB_FOR_MSU.forms.schedule import ScheduleForm
from WEB_FOR_MSU.models import User, Pupil, Teacher, Course, PupilCourse, TeacherCourse, Schedule, Formula, Mark
from WEB_FOR_MSU.output_models import LessonSchedule
from WEB_FOR_MSU.functions import get_next_monday
import pandas as pd

from WEB_FOR_MSU.services import TeacherService


class CourseService:
    @staticmethod
    def add_course(form):
        course = Course(
            name=form.name.data,
            auditory=form.auditory.data,
            course_review_number=form.course_review_number.data,
            direction=form.direction.data,
            emsh_grades=form.emsh_grades.data,
            crediting=form.crediting.data,
            distribution=form.distribution.data,
            intern_work=form.intern_work.data,
            lesson_time=form.lesson_time.data,
            additional_info_for_auditory=form.additional_info_for_auditory.data,
            course_purpose=form.course_purpose.data,
            course_objectives=form.course_objectives.data,
            course_features=form.course_features.data,
            course_format=form.course_format.data,
            target_audience=form.target_audience.data,
            short_description=form.short_description.data,
            number_of_listeners=form.number_of_listeners.data,
            selection=form.selection.data,
            assessment=form.assessment.data,
            platform_format=form.platform_format.data,
            additional_info=form.additional_info.data
        )
        db.session.add(course)
        db.session.commit()
        return course

    @staticmethod
    def get_pupils(course_id):
        course = Course.query.get(course_id)
        if not course:
            return []
        return [assoc.pupil for assoc in course.pupils]

    @staticmethod
    def get_teachers(course_id):
        course = Course.query.get(course_id)
        if not course:
            return []
        return [assoc.teacher for assoc in course.teachers]

    @staticmethod
    def get_all_courses():
        return Course.query.all()

    @staticmethod
    def add_pupil_to_course(course_id, pupil_id, year):
        course = Course.query.get(course_id)
        pupil = Pupil.query.get(pupil_id)
        if not course or not pupil:
            return False
        pupil_course = PupilCourse(pupil_id=pupil_id, course_id=course_id, year=year)
        db.session.add(pupil_course)
        db.session.commit()
        return True

    @staticmethod
    def add_teacher_to_course(course_id, teacher_id, year):
        course = Course.query.get(course_id)
        teacher = Teacher.query.get(teacher_id)
        if not course or not teacher:
            return False
        teacher_course = TeacherCourse(teacher_id=teacher_id, course_id=course_id, year=year)
        db.session.add(teacher_course)
        db.session.commit()
        return True

    @staticmethod
    def get_lessons_in_week(date_start, user_id):
        user = User.query.get(user_id)
        if not user:
            return []
        if user.is_teacher():
            associations = user.teacher[0].courses
        else:
            associations = user.pupil[0].courses
        if not associations:
            return []
        result = []
        for assoc in associations:
            course = assoc.course
            lessons = course.lessons
            for lesson in lessons:
                if date_start <= lesson.date < get_next_monday(date_start):
                    course_type = str(assoc.crediting) if user.is_pupil() else 'none'
                    result.append(LessonSchedule(
                        course_name=course.name,
                        course_type=course_type,
                        auditory=course.auditory,
                        date=lesson.date.strftime('%d.%m'),
                        lesson_time=course.lesson_time
                    ))
        return result

    @staticmethod
    def load_from_file(file, course_form):
        data = pd.read_excel(file)
        name = data.keys()[1]
        data = data.values
        for i in range(len(data)):
            for j in range(len(data[i])):
                if str(data[i][j]) == 'nan':
                    data[i][j] = None
        auditory = None
        course_review_number = data[23][3]
        direction = data[24][3]
        emsh_grades = data[25][3]
        crediting = data[26][3]
        distribution = data[28][3]
        intern_work = data[30][3]
        lesson_time = data[31][3]
        additional_info_for_auditory = data[32][3]
        course_purpose = data[33][3]
        course_objectives = data[34][3]
        course_features = data[35][3]
        course_format = data[36][3]
        target_audience = data[37][3]
        short_description = data[38][3]
        number_of_listeners = data[39][3]
        selection = data[40][3]
        assessment = data[41][3]
        platform_format = data[42][3]
        additional_info = data[43][3]

        course_form.name.data = name
        course_form.auditory.data = auditory
        course_form.course_review_number.data = course_review_number
        course_form.direction.data = direction
        course_form.emsh_grades.data = emsh_grades
        course_form.crediting.data = crediting
        course_form.distribution.data = distribution
        course_form.intern_work.data = intern_work
        course_form.lesson_time.data = lesson_time
        course_form.additional_info_for_auditory.data = additional_info_for_auditory
        course_form.course_purpose.data = course_purpose
        course_form.course_objectives.data = course_objectives
        course_form.course_features.data = course_features
        course_form.course_format.data = course_format
        course_form.target_audience.data = target_audience
        course_form.short_description.data = short_description
        course_form.number_of_listeners.data = number_of_listeners
        course_form.selection.data = selection
        course_form.assessment.data = assessment
        course_form.platform_format.data = platform_format
        course_form.additional_info.data = additional_info

        for i in range(48, 87):
            if data[i][0] is None:
                continue
            lesson_number = data[i][0]
            date = data[i][1]
            theme = data[i][2]
            plan = data[i][3]
            additional_info = data[i][4]
            schedule_form = ScheduleForm()
            schedule_form.lesson_number = int(lesson_number)
            schedule_form.date = date.date()
            schedule_form.theme = theme
            schedule_form.plan = plan
            schedule_form.additional_info = additional_info
            course_form.schedules.append_entry(schedule_form)
        ind = 0
        flag = False
        while ind < len(data):
            if flag:
                break
            for j in range(len(data[ind])):
                if data[ind][j] == 'Формула':
                    flag = True
                    break
            ind += 1
        ind += 2

        while ind < len(data) and flag:
            if data[ind][1] is None:
                break
            name = data[ind][1]
            coefficient = data[ind][3].replace(',', '.')
            try:
                coefficient = float(coefficient)
            except ValueError:
                continue
            formula_form = FormulaForm()
            formula_form.formula_name = name
            formula_form.coefficient = coefficient
            course_form.formulas.append_entry(formula_form)
            ind += 1
        teachers = Teacher.query.all()
        for teacher in teachers:
            teacher_course_form = TeacherCourseForm()
            teacher_course_form.id = teacher.id
            # teacher_course_form.name.label = TeacherService.get_full_name(teacher)
            course_form.teachers.append_entry(teacher_course_form)
            course_form.teachers[-1].form.name.label = TeacherService.get_full_name(teacher)
            course_form.teachers[-1].form.name.data = False
        for i in range(3, 14, 5):
            if data[i][3] is None:
                continue
            teacher = Teacher.query.filter_by(email=data[i + 4][3]).first()
            if teacher is None:
                continue

            for teacher_form in course_form.teachers:
                if teacher_form.form.id.data == teacher.id:
                    teacher_form.form.name.label = TeacherService.get_full_name(teacher)
                    teacher_form.form.name.data = True
                    break

        other = data[18][3]
        if other is not None:
            other = other.split(';')
            for person in other:
                person = person.split(',')
                email = person[-1]
                teacher = Teacher.query.filter_by(email=email).first()
                if teacher is None:
                    continue
                for teacher_form in course_form.teachers:
                    if teacher_form.form.id.data == teacher.id:
                        teacher_form.form.name.label = TeacherService.get_full_name(teacher)
                        teacher_form.form.name.data = True
                        break

    @staticmethod
    def load_from_form(course_form):
        course = Course(
            name=course_form.name.data,
            auditory=course_form.auditory.data,
            course_review_number=course_form.course_review_number.data,
            direction=course_form.direction.data,
            emsh_grades=course_form.emsh_grades.data,
            crediting=course_form.crediting.data,
            distribution=course_form.distribution.data,
            intern_work=course_form.intern_work.data,
            lesson_time=course_form.lesson_time.data,
            additional_info_for_auditory=course_form.additional_info_for_auditory.data,
            course_purpose=course_form.course_purpose.data,
            course_objectives=course_form.course_objectives.data,
            course_features=course_form.course_features.data,
            course_format=course_form.course_format.data,
            target_audience=course_form.target_audience.data,
            short_description=course_form.short_description.data,
            number_of_listeners=course_form.number_of_listeners.data,
            selection=course_form.selection.data,
            assessment=course_form.assessment.data,
            platform_format=course_form.platform_format.data,
            additional_info=course_form.additional_info.data
        )
        db.session.add(course)
        db.session.commit()
        year = datetime.now().year
        for schedule_form in course_form.schedules:
            schedule = Schedule(
                course_id=course.id,
                lesson_number=schedule_form.lesson_number.data,
                date=schedule_form.date.data,
                theme=schedule_form.theme.data,
                plan=schedule_form.plan.data,
                additional_info=schedule_form.additional_info.data,
            )
            if schedule.lesson_number == 1:
                year = schedule.date.year
            db.session.add(schedule)
        db.session.commit()

        for formula_form in course_form.formulas:
            formula = Formula(
                course_id=course.id,
                name=formula_form.formula_name.data,
                coefficient=formula_form.coefficient.data
            )
            db.session.add(formula)
        db.session.commit()
        for teacher_form in course_form.teachers:
            teacher = Teacher.query.get(teacher_form.form.id.data)
            teacher_form.form.name.label = TeacherService.get_full_name(teacher)
            if teacher_form.form.name.data is False:
                continue
            if teacher is None:
                continue
            course.teachers.append(TeacherCourse(
                teacher_id=teacher.id,
                course_id=course.id,
                year=year))
        db.session.commit()
        pupils = Pupil.query.all()
        for pupil in pupils:
            grade = pupil.school_grade
            if str(grade) in course.crediting or course.crediting == 'зачётный для всех классов':
                crediting = True
            else:
                crediting = False
            pupil_course = PupilCourse(
                pupil_id=pupil.id,
                course_id=course.id,
                year=year,
                crediting=crediting
            )
            db.session.add(pupil_course)
        db.session.commit()

    @staticmethod
    def get_lessons(course_id):
        course = Course.query.get(course_id)
        if not course:
            return []
        return course.lessons


