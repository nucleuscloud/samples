from typing import Optional
import fastapi
import myfile
import os

app = fastapi.FastAPI()

@app.get("/")
async def read_root(name: str = None):
    name_to_print = os.getenv("DEFAULT_NAME")
    if name_to_print is None:
        name_to_print = "World"

    if name is not None:
        name_to_print = name

    return {"message": "Hello {} from FastAPI sample".format(name_to_print)}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.get("/myfunction")
async def read_myfunction():
    return myfile.generate_message()
