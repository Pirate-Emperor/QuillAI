""" connects to DB and starts the API with log in console """
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from api.routes import blog_router
from utils.exceptions import BaseHTTPException

app = FastAPI()

origins = ["http://localhost:3000", "http://localhost:3000/sq", ]  # in dev
app.add_middleware(  # to allow react requests
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blog_router, prefix="/api/blog")

@app.exception_handler(BaseHTTPException)
async def http_exception_handler(request: Request, exc: BaseHTTPException):
    """ custom error handler to http response """
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

@app.get("/")
async def root_route():
    """ template for documentation """
    return {"description": "Web-blog: a content sharing platform where "
            "users can publish articles without registration. All publications "
            "are subject to automated AI checks before publication.",
            "message": "be truly free, censor only truly dangerous messages"}

# other API routes defined in routes.py

if __name__ == "__main__":
     # 127.0.0.1 on local and 0.0.0.0 on remote
    try:  # now to view exit log just run python with -v
        import uvicorn
        uvicorn.run("main:app", host="127.0.0.1", port=8000)
    except KeyboardInterrupt:
        green_st = "\033[92m"
        green_end = "\033[0m"
        print(green_st + "INFO"+ green_end +": Exiting by CNTRL+C . . . ")
