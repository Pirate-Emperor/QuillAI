""" api routes on blog, and all operations with them """
from fastapi import (
    APIRouter, Request, HTTPException)
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from services import (moderation_service, post_service)

# template to formate posts
class Post(BaseModel):
    post_id: str
    title: str
    content: str
    category: str

# for safe mount to main
blog_router = APIRouter()

# data for test only api
example_post = {
    "title": "It is the best post",
    "content": "It is a content of the post",
    "category": "Test"
}
example_posts = {"1":example_post,
                 "2":example_post,}


@blog_router.post("/posts")
async def create_post(post: Post):
    """ create new post with AI analyzer """
    new_post = post.dict() # to simple format
    res = await post_service.new_post_with_any_structure(new_post)
    return JSONResponse(res, status_code=201)


@blog_router.get("/posts")
async def get_all_posts():
    """ gets, cleans and lite formats all posts from the DB """
    res, total = await post_service.get_posts_with_page()
    return JSONResponse({"posts": res, "total": total}, status_code=200)


@blog_router.get("/posts/{page}/{page_size}")  # page_size is count that need front
async def get_posts_by_pagination(page: int = 1, page_size: int = 10):
    """ gets, cleans and lite formats all posts from the DB with pagination """
    res, total = await post_service.get_posts_with_page(page, page_size)
    return JSONResponse({"posts": res, "total": total}, status_code=200)


@blog_router.get("/posts/{post_id}")
async def get_post(post_id: str):
    """ gets post by id from the DB specified by alg """
    res = await post_service.get_post_by_id_without_auth(post_id)
    return JSONResponse(res, status_code=200)


@blog_router.get("/category/{category}")
async def get_posts_by_category(category: str):
    """ check category, gets posts by category, clean them """
    res = await post_service.get_posts_by_category_with_val(category)
    return JSONResponse(res, status_code=200)

@blog_router.get("/category")
async def get_categories():
    """ gets unique categories from the DB """
    res = await post_service.get_categories_unique()
    response_data = {"cts": res}
    return JSONResponse(response_data, status_code=200)

@blog_router.get("/search")
async def search_posts(query: str):
    """ chech query, gets posts by query, clean them """
    res = await post_service.get_posts_by_text_with_val(query)
    return JSONResponse(res, status_code=200)
