package usecase

import (
	"time"

	"github.com/assimoes/attendance-api/domain"
)

// AttendanceUsecase provides methods for attendance actions.
type AttendanceUsecase interface {
	ConfirmAttendance(studentID int64, classroomID int64, classID int64) error
}

type attendanceUsecase struct {
	attendanceRepo domain.AttendanceRepository
}

// NewAttendanceUsecase initializes a new attendance usecase.
func NewAttendanceUsecase(attRepo domain.AttendanceRepository) AttendanceUsecase {
	return &attendanceUsecase{
		attendanceRepo: attRepo,
	}
}

// ConfirmAttendance logs the student's attendance for the specified class.
func (u *attendanceUsecase) ConfirmAttendance(studentID int64, classroomID int64, classID int64) error {
	attendance := &domain.Attendance{
		StudentID:   studentID,
		ClassroomID: classroomID,
		ClassID:     classID,
		Timestamp:   time.Now(),
	}
	return u.attendanceRepo.LogAttendance(attendance)
}
