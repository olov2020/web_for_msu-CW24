from WEB_FOR_MSU.output_models.course_info import CourseInfo


class CourseInfoPupil(CourseInfo):
    def __init__(self, course_id, name, grades, crediting, direction, teachers, auditory, lesson_time):
        super().__init__(course_id, name, grades, crediting, direction, teachers, auditory, lesson_time)
