from __future__ import annotations  # Поддержка строковых аннотаций

import os
import uuid
from os.path import splitext
from typing import TYPE_CHECKING

import boto3
from PIL import Image
from dotenv import load_dotenv
from flask import current_app

if TYPE_CHECKING:
    # Импортируем сервисы только для целей аннотации типов
    from web_for_msu_back.services import UserService


class ImageService:

    def __init__(self, user_service: UserService):
        self.user_service = user_service

    def upload_to_yandex_s3(self, file, bucket, object_name):
        load_dotenv()
        if bucket == "images":
            bucket = os.getenv("IMAGES_BUCKET")
        elif bucket == "documents":
            bucket = os.getenv("DOCUMENTS_BUCKET")
        s3_client = boto3.client('s3',
                                 endpoint_url='https://storage.yandexcloud.net',
                                 region_name='ru-central1',
                                 aws_access_key_id=os.getenv('ACCESS_KEY_S3'),
                                 aws_secret_access_key=os.getenv('SECRET_KEY_S3'))

        s3_client.upload_file(file, bucket, object_name)

    def download_from_yandex_s3(self, bucket, object_name, download_path):
        load_dotenv()
        if bucket == "images":
            bucket = os.getenv("IMAGES_BUCKET")
        elif bucket == "documents":
            bucket = os.getenv("DOCUMENTS_BUCKET")
        s3_client = boto3.client('s3',
                                 endpoint_url='https://storage.yandexcloud.net',
                                 region_name='ru-central1',
                                 aws_access_key_id=os.getenv('ACCESS_KEY_S3'),
                                 aws_secret_access_key=os.getenv('SECRET_KEY_S3'))

        s3_client.download_file(bucket, object_name, download_path)

    def get_from_yandex_s3(self, bucket, object_name):
        load_dotenv()
        if bucket == "images":
            bucket = os.getenv("IMAGES_BUCKET")
        elif bucket == "documents":
            bucket = os.getenv("DOCUMENTS_BUCKET")
        url = f"https://storage.yandexcloud.net/{bucket}/{object_name}"
        return url

    def check_file_exists_yandex_s3(self, bucket, object_name):
        load_dotenv()
        if bucket == "images":
            bucket = os.getenv("IMAGES_BUCKET")
        elif bucket == "documents":
            bucket = os.getenv("DOCUMENTS_BUCKET")
        s3_client = boto3.client('s3',
                                 endpoint_url='https://storage.yandexcloud.net',
                                 region_name='ru-central1',
                                 aws_access_key_id=os.getenv('ACCESS_KEY_S3'),
                                 aws_secret_access_key=os.getenv('SECRET_KEY_S3'))
        try:
            s3_client.head_object(Bucket=bucket, Key=object_name)
            return True
        except Exception as e:
            return False

    def delete_from_yandex_s3(self, bucket, object_name):
        load_dotenv()
        if bucket == "images":
            bucket = os.getenv("IMAGES_BUCKET")
        s3_client = boto3.client('s3',
                                 endpoint_url='https://storage.yandexcloud.net',
                                 region_name='ru-central1',
                                 aws_access_key_id=os.getenv('ACCESS_KEY_S3'),
                                 aws_secret_access_key=os.getenv('SECRET_KEY_S3'))

        s3_client.delete_object(Bucket=bucket, Key=object_name)

    def generate_unique_imagename(self):
        unique_filename = str(uuid.uuid4())
        return unique_filename + ".jpeg"

    def generate_unique_filename(self, original_filename):
        filename, file_extension = splitext(original_filename)
        unique_filename = str(uuid.uuid4())
        return unique_filename + file_extension

    def reduce_image_size(self, image_path, output_path, quality=20):
        image = Image.open(image_path)
        image.convert("RGB").save(output_path, "JPEG", quality=quality)

    def change_user_image(self, image, user_id):
        filename = "temp.jpeg"
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(path)
        self.reduce_image_size(path, path)
        image_name = self.generate_unique_imagename()
        self.upload_to_yandex_s3(path, "images", image_name)
        current_user = self.user_service.get_user_by_id(user_id)
        if current_user.image != "default.png":
            self.delete_from_yandex_s3("images", current_user.image)
        current_user.image = image_name
        current_user.save()
        os.remove(path)

    def save_user_image(self, image):
        filename = "temp.jpeg"
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(path)
        self.reduce_image_size(path, path)
        image_name = self.generate_unique_imagename()
        self.upload_to_yandex_s3(path, "images", image_name)
        os.remove(path)
        return image_name

    def save_user_agreement(self, agreement):
        filename = self.generate_unique_filename(agreement.filename)
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        agreement.save(path)
        self.upload_to_yandex_s3(path, "documents", filename)
        os.remove(path)
        return filename

    def get_user_image(self, user_id):
        current_user = self.user_service.get_user_by_id(user_id)
        image_name = current_user.image
        return self.get_from_yandex_s3("images", image_name)
