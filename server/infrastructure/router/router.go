package router

import (
	"github.com/gorilla/mux"
)

// NewRouter initializes a new mux router.
func NewRouter() *mux.Router {
	router := mux.NewRouter()
	return router
}
