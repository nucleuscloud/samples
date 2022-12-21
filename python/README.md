# Fastapi Sample

Used to showcase Nucleus Cloud support for python3 FastApi

# Setup
It's good practice to first create a virtual environment.
```sh
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

# Run
```sh
uvicorn main:app

curl localhost:8000
curl "localhost:8000?name=nick"
```

Set a default name:
```sh
DEFAULT_NAME=Everybody uvicorn main:app

curl localhost:8000
```
