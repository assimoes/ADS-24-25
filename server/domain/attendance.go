package domain

import "time"

type Attendance struct {
	ID          int64     `json:"id"`
	StudentID   int64     `json:"student_id"`
	ClassroomID int64     `json:"classroom_id"`
	ClassID     int64     `json:"class_id"`
	Timestamp   time.Time `json:"timestamp"`
}

type AttendanceRepository interface {
	LogAttendance(attendance *Attendance) error
}
