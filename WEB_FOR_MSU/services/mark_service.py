from WEB_FOR_MSU import db
from WEB_FOR_MSU.models import Mark, Course, Schedule, Formula


class MarkService:
    @staticmethod
    def get_pupil_mark_by_lesson(pupil_id, lesson_id):
        assoc = Mark.query.filter_by(schedule_id=lesson_id, pupil_id=pupil_id).first()
        return assoc.mark if assoc else ""

    @staticmethod
    def calculate_result(pupil_marks, mark_types, formulas):
        result = 0
        types = {}
        for mark_type in mark_types:
            if mark_type not in types:
                types[mark_type] = 1
            else:
                types[mark_type] += 1
        for i in range(len(pupil_marks)):
            if mark_types[i] == 'Отсутствие':
                continue
            if pupil_marks[i].isdigit():
                formula = list(filter(lambda x: x.name == mark_types[i], formulas))[0]
                result += float(pupil_marks[i]) * formula.coefficient / types[mark_types[i]]
        return result

    @staticmethod
    def save_from_form(course_id, marks_form):
        for i in range(len(marks_form.dates)):
            if marks_form.mark_types[i] != 'Отсутствие':
                lesson = Schedule.query.filter_by(course_id=course_id, date=marks_form.dates[i]).first()
                lesson.formulas = Formula.query.filter_by(course_id=course_id, name=marks_form.mark_types[i]).first()
        for i in range(len(marks_form.pupils)):
            for j in range(len(marks_form.dates)):
                mark = marks_form.pupils[i].marks[j]
                if mark:
                    lesson = Schedule.query.filter_by(course_id=course_id, date=marks_form.dates[j]).first()
                    prev_mark = Mark.query.filter_by(schedule_id=lesson.id, pupil_id=marks_form.pupils[i].id).first()
                    if prev_mark:
                        prev_mark.mark = mark
                    else:
                        new_mark = Mark(lesson.id, marks_form.pupils[i].id, mark)
                        db.session.add(new_mark)
        db.session.commit()
