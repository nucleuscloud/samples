# NodeJS Sample App

Used to showcase Nucleus Cloud support for NodeJS.

Note that the nodejs engine is specified in the package.json file to ensure that Nucleus
runs the app with the same version used here.

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
We also provide a Dockerfile here that can be used in lieu of the Nucleus buildpacks.
This docker image is published to the samples repo and can be pulled directly.

```
docker pull ghcr.io/nucleuscloud/samples/nodejs-typescript
```

To build the image, you can use `docker build` or `docker buildx build` for multi-platform images.

```
docker build . -t <tag>
docker run --rm -it -p 127.0.0.1:3000:3000/tcp <tag>

curl localhost:3000
```

To stop the image, run `docker ps` to get the container id, then run `docker stop <container-id>`

## Building for multi-platform

```
docker buildx build --platform=linux/arm64,linux/amd64 . -f ./Dockerfile -t <tag>
```
