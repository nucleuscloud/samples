FROM golang:1.18 AS builder

WORKDIR /app
COPY ./go.mod ./go.mod
RUN go mod download && go mod verify

COPY ./ ./

RUN CGO_ENABLED=0 go build -o bin/main .

FROM gcr.io/distroless/static AS final

LABEL maintainer="nucleuscloud"
LABEL org.opencontainers.image.description="Golang Sample Image"
LABEL org.opencontainers.image.source="https://github.com/nucleuscloud/golang-sample"
USER nonroot:nonroot

COPY --from=builder --chown=nonroot:nonroot /app/bin/main /

CMD ["/main"]

