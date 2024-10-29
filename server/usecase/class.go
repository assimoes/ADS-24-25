package usecase

import (
	"time"

	"github.com/assimoes/attendance-api/domain"
)

// ClassUsecase provides methods related to class operations.
type ClassUsecase interface {
	GetOngoingClass(classroomID int64) (*domain.Class, error)
}

type classUsecase struct {
	classRepo domain.ClassRepository
}

// NewClassUsecase initializes a new ClassUsecase.
func NewClassUsecase(classRepo domain.ClassRepository) ClassUsecase {
	return &classUsecase{classRepo: classRepo}
}

func (u *classUsecase) GetOngoingClass(classroomID int64) (*domain.Class, error) {
	currentTime := time.Now()
	return u.classRepo.GetOngoingClass(classroomID, currentTime)
}
