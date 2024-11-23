from web_for_msu_back.app import db
from web_for_msu_back.app.services import PupilService, ImageService, UserService, TeacherService, MarkService, \
    CourseService, NewsService


def create_services() -> dict[str, object]:
    teacher_service = TeacherService(db, None)  # Временно передаём None
    course_service = CourseService(db, teacher_service)
    image_service = ImageService(None)
    pupil_service = PupilService(db, None, None)
    user_service = UserService(db, teacher_service, pupil_service, image_service)
    teacher_service.user_service = user_service
    image_service.user_service = user_service
    pupil_service.user_service = user_service
    pupil_service.image_service = image_service
    mark_service = MarkService(db, course_service, pupil_service)
    news_service = NewsService(db, image_service)
    return {
        "user_service": user_service,
        "teacher_service": teacher_service,
        "pupil_service": pupil_service,
        "image_service": image_service,
        "mark_service": mark_service,
        "course_service": course_service,
        "news_service": news_service,
    }
