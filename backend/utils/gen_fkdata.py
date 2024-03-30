""" module for generating fake data for tests 
run only through terminal py shell from backend root"""
import time
import uuid
import asyncio
from secrets import randbelow as rndi  # secure randint from 0 to N

from faker import Faker
from backend.repositories.mongodb import MongoDBRepository


def generate_unique_id():
    """ fake id generator based on time and randbelow """
    ip_address = f"{rndi(256)}.{rndi(256)}.{rndi(256)}.{rndi(256)}"
    timestamp = int(time.time() * 1000)
    random_number = rndi(1000000)
    combined_string = f"{ip_address}-{timestamp}-{random_number}"
    unique_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, combined_string))

    return unique_id

fake = Faker()

def generate_markdown_text():
    """ generate fake markdown text """
    title = fake.sentence()
    markdown_text = f"# {title}\n\n"
    for _ in range(5):
        subtitle = fake.sentence()
        markdown_text += f"## {subtitle}\n\n"
        body = fake.text()
        markdown_text += body + "\n\n"

        for point in [fake.sentence() for _ in range(3)]:
            markdown_text += f"- {point}\n"
 
    return markdown_text

async def main():
    """ function for generating fake data for tests """
    repository = MongoDBRepository("blog", "posts")
    for _ in range(30):
        new_post = {
            "post_id": generate_unique_id(),
            "title": fake.sentence(),
            "content": generate_markdown_text(),
            "category": fake.word()
        }
        try:
            created_post = await repository.create_post(new_post)
            print(f"Create new post: {created_post}")
        except Exception as e:
            print(f"Error at {e}")

asyncio.run(main())
