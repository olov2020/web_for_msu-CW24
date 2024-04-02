import os
import uuid
from os.path import splitext

import boto3
from PIL import Image
from dotenv import load_dotenv
from flask import current_app
from flask_login import current_user


class ImageService:
    @staticmethod
    def upload_to_yandex_s3(file, bucket, object_name):
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

    @staticmethod
    def download_from_yandex_s3(bucket, object_name, download_path):
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

    @staticmethod
    def get_from_yandex_s3(bucket, object_name):
        load_dotenv()
        if bucket == "images":
            bucket = os.getenv("IMAGES_BUCKET")
        elif bucket == "documents":
            bucket = os.getenv("DOCUMENTS_BUCKET")
        url = f"https://storage.yandexcloud.net/{bucket}/{object_name}"
        return url

    @staticmethod
    def check_file_exists_yandex_s3(bucket, object_name):
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

    @staticmethod
    def delete_from_yandex_s3(bucket, object_name):
        load_dotenv()
        if bucket == "images":
            bucket = os.getenv("IMAGES_BUCKET")
        s3_client = boto3.client('s3',
                                 endpoint_url='https://storage.yandexcloud.net',
                                 region_name='ru-central1',
                                 aws_access_key_id=os.getenv('ACCESS_KEY_S3'),
                                 aws_secret_access_key=os.getenv('SECRET_KEY_S3'))

        s3_client.delete_object(Bucket=bucket, Key=object_name)

    @staticmethod
    def generate_unique_imagename(original_filename):
        unique_filename = str(uuid.uuid4())
        return unique_filename + ".jpeg"

    @staticmethod
    def generate_unique_filename(original_filename):
        filename, file_extension = splitext(original_filename)
        unique_filename = str(uuid.uuid4())
        return unique_filename + file_extension

    @staticmethod
    def reduce_image_size(image_path, output_path, quality=20):
        image = Image.open(image_path)
        image.convert("RGB").save(output_path, "JPEG", quality=quality)

    @staticmethod
    def change_user_image(image):
        filename = "temp.jpeg"
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(path)
        ImageService.reduce_image_size(path, path)
        image_name = ImageService.generate_unique_imagename(image.filename)
        ImageService.upload_to_yandex_s3(path, "images", image_name)
        if current_user.image != "default.png":
            ImageService.delete_from_yandex_s3("images", current_user.image)
        current_user.image = image_name
        current_user.save()
        os.remove(path)

    @staticmethod
    def save_user_image(image):
        filename = "temp.jpeg"
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(path)
        ImageService.reduce_image_size(path, path)
        image_name = ImageService.generate_unique_imagename(image.filename)
        ImageService.upload_to_yandex_s3(path, "images", image_name)
        os.remove(path)
        return image_name

    @staticmethod
    def save_user_agreement(agreement):
        filename = ImageService.generate_unique_filename(agreement.filename)
        path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        agreement.save(path)
        ImageService.upload_to_yandex_s3(path, "documents", filename)
        os.remove(path)
        return filename

    @staticmethod
    def get_user_image():
        image_name = current_user.image
        if not ImageService.check_file_exists_yandex_s3("images", image_name):
            image_name = "default.png"
        return ImageService.get_from_yandex_s3("images", image_name)
