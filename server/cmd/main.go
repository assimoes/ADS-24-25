package main

import (
	"log"
	"net/http"

	"github.com/assimoes/attendance-api/infrastructure/db"
	"github.com/assimoes/attendance-api/infrastructure/repository"
	"github.com/assimoes/attendance-api/infrastructure/router"
	handlers "github.com/assimoes/attendance-api/interface/http"

	"github.com/assimoes/attendance-api/usecase"
)

func main() {
	database, err := db.NewDB()
	if err != nil {
		log.Fatal(err)
	}

	classRepo := repository.NewClassRepository(database)
	attendanceRepo := repository.NewAttendanceRepository(database)

	classUsecase := usecase.NewClassUsecase(classRepo)
	attendanceUsecase := usecase.NewAttendanceUsecase(attendanceRepo)

	r := router.NewRouter()
	handlers.NewClassHandler(r, classUsecase)
	handlers.NewAttendanceHandler(r, attendanceUsecase)

	log.Fatal(http.ListenAndServe(":8080", r))
}
