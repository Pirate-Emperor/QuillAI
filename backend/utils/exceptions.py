""" module for custom exceptions """
class BaseHTTPException(Exception):
    status_code: int
    detail: str

    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail

class InvalidInputException(BaseHTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=422, detail=detail)

class FileNotFoundException(BaseHTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=500, detail=detail)

class PostNotFoundException(BaseHTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=404, detail=detail)

# TODO: add detailed error messages, diagnostic information, 
# specific error codes, logging, and thorough testing
