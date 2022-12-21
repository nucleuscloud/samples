# Golang Sample

Used to showcase Nucleus Cloud support for Golang.

## Building
```sh
go build -o bin/main .
```

## Running
```sh
./bin/main

curl localhost:8080
curl "localhost:8080?name=nick"
```

Set a default name:
```sh
DEFAULT_NAME=Everybody ./bin/main

curl localhost:8080
```

## Build and Run Docker
```
docker build . -t <tag>
docker run --rm -it -p 127.0.0.1:8080:8080/tcp <tag>

curl localhost:8080
```


## Building for multi-platform
```
docker buildx build --platform=linux/arm64,linux/amd64 . -f ./Dockerfile -t ghcr.io/nucleuscloud/golang-sample:latest
```
