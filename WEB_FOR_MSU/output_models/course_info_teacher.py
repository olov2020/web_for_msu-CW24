from WEB_FOR_MSU.output_models.course_info import CourseInfo


class CourseInfoTeacher(CourseInfo):
    def __init__(self, course_id, name, grades, crediting, direction, teachers, auditory, pupils_number):
        super().__init__(course_id, name, grades, crediting, direction, teachers, auditory)
        self.pupils_number = pupils_number
