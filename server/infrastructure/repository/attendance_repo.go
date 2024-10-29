package repository

import (
	"database/sql"

	"github.com/assimoes/attendance-api/domain"
)

type attendanceRepository struct {
	db *sql.DB
}

func NewAttendanceRepository(db *sql.DB) domain.AttendanceRepository {
	return &attendanceRepository{db: db}
}

func (r *attendanceRepository) LogAttendance(attendance *domain.Attendance) error {
	_, err := r.db.Exec("INSERT INTO attendance (student_id, classroom_id, class_id, timestamp) VALUES ($1, $2, $3, $4)",
		attendance.StudentID, attendance.ClassroomID, attendance.ClassID, attendance.Timestamp)
	return err
}
