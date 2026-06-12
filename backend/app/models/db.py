from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String, index=True) # student, teacher, admin
    name = Column(String)
    email = Column(String, unique=True, index=True)

    biometric_profile = relationship("BiometricProfile", back_populates="user", uselist=False)
    attendance_logs = relationship("AttendanceLog", back_populates="user")

class BiometricProfile(Base):
    __tablename__ = "biometric_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Store embeddings as JSON lists for SQLite compatibility during dev, use pgvector in production
    face_embedding = Column(JSON, nullable=True) 
    voice_embedding = Column(JSON, nullable=True)
    gait_signature = Column(JSON, nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="biometric_profile")

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String)
    location = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)

    attendance_logs = relationship("AttendanceLog", back_populates="session")

class AttendanceLog(Base):
    __tablename__ = "attendance_logs"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    confidence_score = Column(Float)
    modality_used = Column(String) # face, voice, gait, multi
    spoofing_risk_score = Column(Float)
    status = Column(String) # present, proxy_suspected, absent

    user = relationship("User", back_populates="attendance_logs")
    session = relationship("Session", back_populates="attendance_logs")
