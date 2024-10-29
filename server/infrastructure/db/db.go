package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// NewDB initializes an SQLite in-memory database and seeds initial data.
func NewDB() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		log.Fatalf("Could not open SQLite DB: %v", err)
		return nil, err
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("Could not ping SQLite DB: %v", err)
		return nil, err
	}

	log.Println("Connected to the SQLite database in memory")

	// Run migrations and seed data
	if err := runMigrations(db); err != nil {
		return nil, err
	}
	if err := seedData(db); err != nil {
		return nil, err
	}

	return db, nil
}

// runMigrations creates the necessary tables.
func runMigrations(db *sql.DB) error {
	tables := []string{
		`CREATE TABLE IF NOT EXISTS classrooms (id INTEGER PRIMARY KEY, qr_code TEXT)`,
		`CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT)`,
		`CREATE TABLE IF NOT EXISTS classes (id INTEGER PRIMARY KEY, classroom_id INTEGER, name TEXT, start_time TEXT, end_time TEXT)`,
		`CREATE TABLE IF NOT EXISTS attendance (id INTEGER PRIMARY KEY, student_id INTEGER, classroom_id INTEGER, class_id INTEGER, timestamp TEXT)`,
	}

	for _, table := range tables {
		if _, err := db.Exec(table); err != nil {
			return err
		}
	}
	log.Println("Tables created successfully")
	return nil
}

// seedData inserts initial data into the database.
func seedData(db *sql.DB) error {
	// Seed classrooms
	_, err := db.Exec(`INSERT INTO classrooms (id, qr_code) VALUES (1, 'room1_qr_code'), (2, 'room2_qr_code')`)
	if err != nil {
		return err
	}

	// Seed students
	_, err = db.Exec(`INSERT INTO students (id, name) VALUES (1, 'John Doe'), (2, 'Jane Smith')`)
	if err != nil {
		return err
	}

	// Seed classes
	_, err = db.Exec(`INSERT INTO classes (id, classroom_id, name, start_time, end_time) VALUES 
        (1, 1, 'Math 101', '2024-10-29T16:00:00Z', '2024-10-29T18:00:00Z'),
        (2, 2, 'Science 201', '2024-10-29T17:00:00Z', '2024-10-29T19:00:00Z')`)
	if err != nil {
		return err
	}

	log.Println("Seed data inserted successfully")
	return nil
}
