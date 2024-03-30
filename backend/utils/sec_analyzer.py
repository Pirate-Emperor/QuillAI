""" module with only analyzer by ai"""
import os
import asyncio
from transformers import pipeline
from fastapi import FastAPI, Request # for run is docker as microservice, it can use more resources

# TODO: optimize Transformer model loading in Python (cache, async, compression, data processing)

from g4f.Provider import (  # gpt proxy as api
        DDG, RetryProvider, Liaobots, GPTalk, Aura,
        Bing, GigaChat, HuggingFace, Replicate,
        DeepInfra, FlowGpt, GeminiPro
        )
import g4f.debug
import g4f

app = FastAPI()
PROFANITY_PIPE = pipeline("text-classification", model="parsawar/Profanity2.1")
SENTIMENT_PIPE = pipeline("text-classification", model="sbcBI/sentiment_analysis")

def get_model(name: str):
    """ get model pipeline by name """
    if name == 'profanity':
        return PROFANITY_PIPE
    return SENTIMENT_PIPE

async def acreate(msg):
    """ get response from history base prompt """
    response = await g4f.ChatCompletion.create_async(
        model="",
        # messages=[{"role": "user", "content": "Hello"}],
        messages=msg,
        provider=RetryProvider([GPTalk , Liaobots, Aura, DeepInfra, FlowGpt, Bing,
            ChatBase, ChatForAi, ChatgptNext, Gpt6, GptChatly], shuffle=False),
    )
    return response

async def check_count_by_api(text: str) -> bool | str:
    """ check text for profanity by gpt with base prompt through proxy """
    res = await acreate([{"role":"user", "content":
    "Please rate the aggression level of the following text on a scale of 1\
        (minimum) to 9 (maximum) ( only use a number in your answer):"},
    {"role":"user", "content": text}]) # prompt works on LLAMA2,3 and gpt3.5
    try:
        if int(res) > 5:
            return False
        return text
    except ValueError:
        return text

def check_count_by_model(text: str, pipe, label: str):
    """ check text for profanity """
    if len(text) < 96:
        result = pipe([text])
        print(result)
        if result[0]['label'] == label: #'abusive text':
            return None
        return text

    ab_count = 0
    parts_t = [text[i:i+96] for i in range(0, len(text), 96)]
    results = pipe(parts_t)
    print(results)
    ab_count = sum(1 for result in results if result['label'] == 'abusive text')

    if ab_count / len(parts_t) > 0.9:
        return None
    return text


@app.post("/check_profanity")
async def check_profanity(request: Request):
    data = await request.json()
    text = data["text"]
    result = check_count_by_model(text, PROFANITY_PIPE, 'abusive text')
    return {"result": result}

@app.post("/check_sentiment")
async def check_sentiment(request: Request):
    data = await request.json()
    text = data["text"]
    result = check_count_by_model(text, SENTIMENT_PIPE, 'NEGATIVE')
    return {"result": result}

@app.post("/check_count_by_g4f_api")
async def check_count_by_g4f_api_endpoint(request: Request):
    data = await request.json()
    text = data["text"]
    result = await check_count_by_api(text)
    return {"result": result}

def legacy_test_check_count():
    """ tests and experiments using different models and APIs """
    check_count_by_model(
        "This restaurant is awesom arse-bandits and\
        so is this one. It is awesome", PROFANITY_PIPE, 'abusive text')
    check_count_by_model(
        "This restaurant is awful arse-bandits", SENTIMENT_PIPE, 'NEGATIVE')

    loop = asyncio.get_event_loop() # below works via G4F proxy
    task = acreate([{"role":"user", "content":"Please rate the aggression level of \
        the following text on a scale of 1 (minimum) to 9 (maximum) \
        ( only use a number in your answer):"},
        {"role":"user", "content":"Message with possible profanity: i just sayed?"}])
    test_ret = loop.run_until_complete(task)
    print(test_ret)
    # or http API for use in docker container
    os.system("""
        curl -X POST \
        http://localhost:8005/check_count_by_api \
        -H 'Content-Type: application/json' \
        -d '{"text": "This restaurant is awful arse-bandits, and so is this one. It is awesome"}'
    """)

if __name__ == "__main__":
    # legacy_test_check_count()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
