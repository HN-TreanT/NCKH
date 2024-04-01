# import streamlit as st
import numpy as np
import pickle
import preprocess
import time
import uvicorn
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
# add cor
origins = ["*"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# chuyển nhãn sang tiếng việt
name_result = {
        'nhaycam': 'Nhạy cảm',
        'konhaycam': 'Không nhạy cảm'
    }

# st.title('Vietnamese News Classification')

# load model
model = pickle.load(open('./best_model.sav', 'rb'))

# load feature extractor
feature_extractor = pickle.load(open('./feature_extractor.sav', 'rb'))

# news = st.text_area('News input')

# if news:
#     # Tiền xử lý và loại bỏ stopwords
#     start = time.time()
#     data = preprocess.text_preprocessing(news)
#     data = preprocess.remove_stopwords(data)
#     preprocess_time = time.time() - start

#     # Dự đoán
#     start = time.time()
#     np_data = np.array([data])
#     feature = feature_extractor.transform(np_data)
#     pred = model.predict(feature)
#     result = name_result[pred[0]]
#     predict_time = time.time() - start

#     total = round(predict_time + preprocess_time, 2)

#     # Hiện kết quả
#     st.text('Kết quả: ' + result)
#     st.text('Time: ' + str(total) + 's')
#     #st.text('Data preprocessed: ' + data)
class Post(BaseModel): 
    title: str
    content: str
    url: str
    images: list[str]
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/check-post")
async def checkPost(post : Post):
    print(post)
    response = {
            "status": True,
            "message": "success",
        }
    try:
    # Tiền xử lý và loại bỏ stopwords
        data = preprocess.text_preprocessing(post.content)
        data = preprocess.remove_stopwords(data)
            # Dự đoán
        np_data = np.array([data])
        feature = feature_extractor.transform(np_data)
        pred = model.predict(feature)
        result = name_result[pred[0]]
        
        if result == "nhaycam":
            return response       
        response["status"] = False
        response["message"] = "Khong nhay cam"
        return response
    except Exception as e:
        response["status"] = False
        response["message"] = str(e) 
        return response

# if __name__ == "__main__":
#    uvicorn.run(app, host="127.0.0.1", port=8889, reload=False)
