package repository

import (
	"database/sql"
	"time"

	"github.com/assimoes/attendance-api/domain"
)

type classRepository struct {
	db *sql.DB
}

func NewClassRepository(db *sql.DB) domain.ClassRepository {
	return &classRepository{db: db}
}

func (r *classRepository) GetOngoingClass(classroomID int64, currentTime time.Time) (*domain.Class, error) {
	var start, end string
	var class domain.Class

	currentTimeStr := currentTime.Format(time.RFC3339)

	err := r.db.QueryRow(`SELECT id, classroom_id, name, start_time, end_time 
                          FROM classes 
                          WHERE classroom_id = $1 
                          AND start_time <= $2 
                          AND end_time >= $2`,
		classroomID, currentTimeStr).
		Scan(&class.ID, &class.ClassRoomID, &class.Name, &start, &end)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	class.StartTime, err = time.Parse(time.RFC3339, start)
	if err != nil {
		return nil, err
	}
	class.EndTime, err = time.Parse(time.RFC3339, end)
	if err != nil {
		return nil, err
	}

	return &class, nil
}
