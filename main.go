package main

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"strconv"

	_ "github.com/mattn/go-sqlite3"
)

type Todo struct {
	ID   int
	Task string
	Done bool
}

var db *sql.DB
var tmpl = template.Must(template.ParseGlob("templates/*.html"))

func main() {
	var err error
	db, err = sql.Open("sqlite3", "./lite.db")
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	http.HandleFunc("/", handleIndex)
	http.HandleFunc("/add", handleAdd)
	http.HandleFunc("/toggle", handleToggle)

	log.Println("Listening on :8082")
	log.Fatal(http.ListenAndServe(":8082", nil))
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	todos, err := getTodos()
	if err != nil {
		http.Error(w, "Failed to load todos", 500)
		return
	}
	tmpl.ExecuteTemplate(w, "todos.html", todos)
}

func handleAdd(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		task := r.FormValue("task")
		_, err := db.Exec("INSERT INTO todos(task) VALUES (?)", task)
		if err != nil {
			http.Error(w, "DB insert error", 500)
			return
		}
		todos, _ := getTodos()
		tmpl.ExecuteTemplate(w, "todo-list", todos)
	}
}

func handleToggle(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		idStr := r.FormValue("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid ID", 400)
			return
		}
		_, err = db.Exec("UPDATE todos SET done = NOT done WHERE id = ?", id)
		if err != nil {
			http.Error(w, "DB toggle error", 500)
			return
		}
		todos, _ := getTodos()
		tmpl.ExecuteTemplate(w, "todo-list", todos)
	}
}

func getTodos() ([]Todo, error) {
	rows, err := db.Query("SELECT id, task, done FROM todos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var todos []Todo
	for rows.Next() {
		var t Todo
		if err := rows.Scan(&t.ID, &t.Task, &t.Done); err != nil {
			return nil, err
		}
		todos = append(todos, t)
	}
	return todos, nil
}
