from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class Item(BaseModel):
    id: int
    name: str
    description: str | None = None
    price: float


class ItemCreate(BaseModel):
    name: str
    description: str | None = None
    price: float


# Example in-memory storage
items: list[Item] = [
    Item(id=1, name="Laptop", description="High-performance laptop", price=999.99),
    Item(id=2, name="Mouse", description="Wireless mouse", price=29.99),
]


@app.get("/")
def read_root() -> dict[str, str]:
    return {"Hello": "World"}


@app.get("/items")
def get_items() -> list[Item]:
    return items


@app.get("/items/{item_id}")
def get_item(item_id: int) -> Item | None:
    for item in items:
        if item.id == item_id:
            return item
    return None


@app.post("/items")
def create_item(item: ItemCreate) -> Item:
    new_item = Item(
        id=len(items) + 1,
        name=item.name,
        description=item.description,
        price=item.price,
    )
    items.append(new_item)
    return new_item
