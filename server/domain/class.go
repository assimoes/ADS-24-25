package domain

import "time"

type Class struct {
	ID          int64     `json:"id"`
	ClassRoomID int64     `json:"classroom_id"`
	Name        string    `json:"name"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
}

type ClassRepository interface {
	GetOngoingClass(classRoomID int64, currentTime time.Time) (*Class, error)
}
