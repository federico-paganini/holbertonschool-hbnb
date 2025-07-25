import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
    DEBUG = False

    DB_USER = os.getenv("DB_USER", "usuario_por_defecto")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "contraseña")
    DB_NAME = os.getenv("DB_NAME", "basededatos")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DEBUG = True


config = {"development": DevelopmentConfig, "default": DevelopmentConfig}
