package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/assimoes/attendance-api/usecase"
	"github.com/gorilla/mux"
)

// ClassHandler provides HTTP handlers for class-related operations.
type ClassHandler struct {
	classUsecase usecase.ClassUsecase
}

// NewClassHandler initializes a new ClassHandler.
func NewClassHandler(router *mux.Router, usecase usecase.ClassUsecase) {
	handler := &ClassHandler{classUsecase: usecase}
	router.HandleFunc("/classrooms/{classroom_id}/ongoing", handler.GetOngoingClass).Methods("GET")
}

// GetOngoingClass returns the current ongoing class in the classroom.
func (h *ClassHandler) GetOngoingClass(w http.ResponseWriter, r *http.Request) {
	classroomID, err := strconv.ParseInt(mux.Vars(r)["classroom_id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid classroom ID", http.StatusBadRequest)
		return
	}

	class, err := h.classUsecase.GetOngoingClass(classroomID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if class == nil {
		http.Error(w, "No ongoing class found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(class)
}
