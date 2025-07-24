package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("../frontend"))
	http.Handle("/", fs)

	port := ":8082"
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
