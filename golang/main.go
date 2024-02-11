package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Hello ASL!")
	loc, err := time.LoadLocation("America/New_York")
	if err != nil {
		fmt.Println("Error loading location", err)
		return
	}
	fmt.Println(time.Now().In(loc))
}
