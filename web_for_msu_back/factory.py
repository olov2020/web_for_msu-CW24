from web_for_msu_back.services.teacher_service import TeacherService
from web_for_msu_back.services.user_service import UserService


def create_services():
    teacher_service = TeacherService(None)  # Временно передаём None
    user_service = UserService(teacher_service)
    teacher_service.user_service = user_service
    return user_service, teacher_service
