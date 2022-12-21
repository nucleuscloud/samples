package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8080"
	}

	http.Handle("/", loggingMiddleware(http.HandlerFunc(handler)))
	log.Printf("Server running at http://0.0.0.0:%s", port)
	err := http.ListenAndServe("0.0.0.0:"+port, nil)
	if err != nil {
		panic(err)
	}
}

func handler(w http.ResponseWriter, req *http.Request) {
	name := os.Getenv("DEFAULT_NAME")
	if name == "" {
		name = "Anonymous"
	}
	queryValues := req.URL.Query()
	queryName := queryValues.Get("name")
	if queryName != "" {
		name = queryName
	}
	fmt.Fprintf(w, "Hello %s", name)
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		log.Printf("uri: %s", req.URL)
		next.ServeHTTP(w, req)
	})
}
