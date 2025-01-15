from web_for_msu_back.app.functions import get_services


def add_scheduled_jobs(scheduler, app):
    scheduler.add_job(
        id='annual_task_winter',
        func=finish_term,
        args=[app, "first"],
        trigger='cron',
        month='1',
        day='26',
        hour='0',
        minute='0'
    )

    scheduler.add_job(
        id='annual_task_summer',
        func=finish_term,
        args=[app, "second"],
        trigger='cron',
        month='5',
        day='21',
        hour='0',
        minute='0',
    )

    scheduler.add_job(
        id='annual_increase_grade',
        func=increase_grade,
        args=[app],
        trigger='cron',
        month='6',
        day='1',
        hour='0',
        minute='0',
    )


def finish_term(app, term):
    with app.app_context():
        services = get_services()
        mark_service = services["mark_service"]
        mark_service.finish_term(term)


def increase_grade(app):
    with app.app_context():
        services = get_services()
        pupil_service = services["pupil_service"]
        pupil_service.increase_grade()
