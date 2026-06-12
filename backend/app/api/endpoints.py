from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from app.db.session import get_db
from app.models import db as models

router = APIRouter()

# Pydantic Schemas
class UserCreate(BaseModel):
    name: str
    email: str
    role: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True

class AttendanceLogCreate(BaseModel):
    session_id: int
    user_id: int
    confidence_score: float
    modality_used: str
    spoofing_risk_score: float
    status: str

# Endpoints
@router.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(name=user.name, email=user.email, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/users/", response_model=List[UserResponse])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

@router.post("/attendance/")
def log_attendance(log: AttendanceLogCreate, db: Session = Depends(get_db)):
    db_log = models.AttendanceLog(**log.model_dump())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return {"message": "Attendance logged successfully", "log_id": db_log.id}

@router.get("/attendance/session/{session_id}")
def get_session_attendance(session_id: int, db: Session = Depends(get_db)):
    logs = db.query(models.AttendanceLog).filter(models.AttendanceLog.session_id == session_id).all()
    return logs
