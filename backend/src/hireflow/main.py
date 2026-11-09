from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from hireflow.db import engine
from .api import health

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    try:
        yield
    finally:
        await engine.dispose()

app = FastAPI(
    title="HireFlow AI API",
    description="AI-powered recruitment operations platform",
    version="0.1.0",
    lifespan=lifespan,
)

app.include_router(health)

@app.get("/")
async def root():
    return {
        "message": "Welcome to HireFlow AI API",
        "status": "running",
    }