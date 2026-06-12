import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Attendance Intelligence Platform"
    API_V1_STR: str = "/api/v1"
    
    # SQLite for development, Postgres for production
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./attendance.db")
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-for-dev")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()
