""" module for PostgreSQL repository and test it;
minimalism and the goal of the project not allow sqlalchemy, I want to know pain :)
it seems that there are SQL injections, so try hack me
"""
import os
import asyncio
from dotenv import load_dotenv
import asyncpg

from utils.exceptions import PostNotFoundException, InvalidInputException

# load .env, one time at startup
load_dotenv()
dbname = os.getenv('DB1_NAME')
user = os.getenv('DB1_USER')
host = os.getenv('DB1_HOST')
port = os.getenv('DB1_PORT')
password = os.getenv('DB1_PASS')

class PostgresRepository: # add postgres repository to access DB
    def __init__(self):
        self.connection = None

    async def connect(self): # to support legacy code
        self.connection = await asyncpg.connect(
            database=dbname, user=user, host=host, port=port, password=password)

    async def __aenter__(self):
        self.connection = await asyncpg.connect(
            database=dbname, user=user, host=host, port=port, password=password)
        return self

    async def __aexit__(self, exc_type, exc, tb):
        await self.connection.close()

    async def create_post(self, post):
        category_name, post_id, title, content = post['category'],
        post['post_id'], post['title'], post['content']
        category = await self.connection.fetchrow(
            'SELECT id FROM categories WHERE name = $1', category_name)
        if category is None:
            print(f"Category '{category_name}' does not exist.") # debug
            return

        await self.connection.execute(
            'INSERT INTO posts (post_id, title, content, category_id) VALUES ($1, $2, $3, $4)',
            post_id, title, content, category['id'])

    async def get_categories(self):
        return await self.connection.fetch('SELECT * FROM categories')

    async def get_posts(self):
        return await self.connection.fetch('SELECT * FROM posts')

    async def get_posts_by_category(self, category_name):
        return await self.connection.fetch(
            'SELECT * FROM posts WHERE category_id = (SELECT id FROM categories WHERE name = $1)',
            category_name)

    async def get_post_by_id(self, post_id):
        return await self.connection.fetchrow('SELECT * FROM posts WHERE post_id = $1', post_id)

    async def get_posts_by_text(self, place, query):
        return await self.connection.fetch(
            f'SELECT * FROM posts WHERE {place} LIKE $1', f'%{query}%')


    async def update_post(self, post_id, post_data):
        await self.connection.execute(
            'UPDATE posts SET title = $1, content = $2 WHERE post_id = $3', 
            post_data['title'], post_data['content'], post_id)

    async def delete_post(self, post_id):
        await self.connection.execute('DELETE FROM posts WHERE post_id = $1', post_id)

    async def get_posts_by_pagination(self, page, page_size):
        return await self.connection.fetch(
            'SELECT * FROM posts LIMIT $1 OFFSET $2', page_size, (page - 1) * page_size)


    async def add_category(self, name):
        # add category if not exists
        existing_category = await self.connection.fetchrow(
            'SELECT id FROM categories WHERE name = $1', name)
        if existing_category is None:
            await self.connection.execute('INSERT INTO categories (name) VALUES ($1)', name)
            print(f"Category '{name}' added.") # TODO: logging here
        else:
            print(f"Category '{name}' already exists.")


async def delete_all_test_posts(connection):
    # Удаляем все посты, которые были добавлены в процессе тестирования
    await connection.execute('DELETE FROM posts WHERE title LIKE $1', 'Test Post%')


async def main():
    # async is just illusion of parallelism, db work is sync in docker, but it more efficient
    # test PostgresRepository
    repository = PostgresRepository() # repository, some legacy style
    await repository.connect()
    await repository.add_category('test') # post_id : uuid
    await repository.create_post(
        {'category': 'test', 'post_id': '1',
         'title': 'Test Post 1', 'content': 'Test Post 1 content'})
    await repository.create_post(
        {'category': 'test', 'post_id': '2',
         'title': 'Test Post 2', 'content': 'Test Post 2 content'})
    await repository.create_post(
        {'category': 'test', 'post_id': '3',
         'title': 'Test Post 3', 'content': 'Test Post 3 content'})
    print(await repository.get_posts_by_category('test'))
    print(await repository.get_posts_by_text('title', 'Test Post'))
    print(await repository.get_posts_by_pagination(1, 2))
    print(await repository.get_post_by_id(1))
    print(await repository.get_categories())
    print(await repository.get_posts())
    await delete_all_test_posts(repository.connection)



if __name__ == "__main__":
    asyncio.run(main())
