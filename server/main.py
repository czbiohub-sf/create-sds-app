from typing import ClassVar

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqladmin import Admin, ModelView
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Item as ItemModel

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


# Create database tables
Base.metadata.create_all(bind=engine)

# Create SQLAdmin
admin = Admin(app, engine)


# SQLAdmin ModelView for Item
class ItemAdmin(ModelView, model=ItemModel):
    column_list: ClassVar = [
        ItemModel.id,
        ItemModel.name,
        ItemModel.description,
        ItemModel.price,
    ]
    column_searchable_list: ClassVar = [ItemModel.name, ItemModel.description]
    column_sortable_list: ClassVar = [ItemModel.id, ItemModel.name, ItemModel.price]


admin.add_view(ItemAdmin)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"Hello": "World"}


@app.get("/items")
def get_items(db: Session = Depends(get_db)) -> list[Item]:
    db_items = db.query(ItemModel).all()
    return [
        Item(id=item.id, name=item.name, description=item.description, price=item.price)
        for item in db_items
    ]


@app.get("/items/{item_id}")
def get_item(item_id: int, db: Session = Depends(get_db)) -> Item:
    db_item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return Item(
        id=db_item.id,
        name=db_item.name,
        description=db_item.description,
        price=db_item.price,
    )


@app.post("/items")
def create_item(item: ItemCreate, db: Session = Depends(get_db)) -> Item:
    db_item = ItemModel(
        name=item.name,
        description=item.description,
        price=item.price,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return Item(
        id=db_item.id,
        name=db_item.name,
        description=db_item.description,
        price=db_item.price,
    )
