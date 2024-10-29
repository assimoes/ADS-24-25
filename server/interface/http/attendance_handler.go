package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/assimoes/attendance-api/usecase"
	"github.com/gorilla/mux"
)

// AttendanceHandler handles HTTP requests related to attendance.
type AttendanceHandler struct {
	attendanceUsecase usecase.AttendanceUsecase
}

// NewAttendanceHandler initializes a new attendance handler.
func NewAttendanceHandler(router *mux.Router, usecase usecase.AttendanceUsecase) {
	handler := &AttendanceHandler{attendanceUsecase: usecase}
	router.HandleFunc("/attendance", handler.ConfirmAttendance).Methods("POST")
}

// ConfirmAttendance confirms the student's attendance for a class.
func (h *AttendanceHandler) ConfirmAttendance(w http.ResponseWriter, r *http.Request) {
	studentID, err := strconv.ParseInt(r.URL.Query().Get("student_id"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid student ID", http.StatusBadRequest)
		return
	}
	classroomID, err := strconv.ParseInt(r.URL.Query().Get("classroom_id"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid classroom ID", http.StatusBadRequest)
		return
	}
	classID, err := strconv.ParseInt(r.URL.Query().Get("class_id"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid class ID", http.StatusBadRequest)
		return
	}

	if err := h.attendanceUsecase.ConfirmAttendance(studentID, classroomID, classID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "attendance confirmed"})
}
