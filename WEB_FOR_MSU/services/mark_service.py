from WEB_FOR_MSU.models import Mark


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
    def save_from_form(marks_form):
        pass