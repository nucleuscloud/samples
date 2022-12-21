# NodeJS Sample App

Used to showcase Nucleus Cloud support for NodeJS.

## Install and Build
```sh
npm install
```

## Running
```sh
npm start

curl localhost:3000
curl "localhost:3000?name=nick"
```

Set a default name:
```sh
DEFAULT_NAME=Everybody npm start

curl localhost:3000
```

## Build and Run Docker
```
docker build . -t <tag>
docker run --rm -it -p 127.0.0.1:3000:3000/tcp <tag>

curl localhost:3000
```


## Building for multi-platform
```
docker buildx build --platform=linux/arm64,linux/amd64 . -f ./Dockerfile -t ghcr.io/nucleuscloud/nodejs-sample:latest
```
