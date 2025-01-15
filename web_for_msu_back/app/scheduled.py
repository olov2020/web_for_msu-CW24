from functions import get_services


def add_scheduled_jobs(scheduler):
    services = get_services()
    mark_service = services["mark_service"]
    scheduler.add_job(
        id='annual_task_winter',
        func=mark_service.finish_term,
        trigger='cron',
        month='1',
        day='26',
        hour='0',
        minute='0'
    )

    scheduler.add_job(
        id='annual_task_summer',
        func=mark_service.finish_term,
        trigger='cron',
        month='5',
        day='21',
        hour='0',
        minute='0',
    )

    print(scheduler.get_jobs())


def hello():
    print("Hello")
