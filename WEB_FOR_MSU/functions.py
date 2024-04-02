from datetime import timedelta, datetime


def get_next_monday(date_start):
    days_until_monday = (7 - date_start.weekday()) % 7
    if days_until_monday == 0:
        days_until_monday = 7
    next_monday = date_start + timedelta(days=days_until_monday)
    return next_monday
