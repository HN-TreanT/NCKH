import streamlit as st
import numpy as np
import pickle
import preprocess
import time

# chuyển nhãn sang tiếng việt
name_result = {
    'nhaycam': 'Nhạy cảm',
    'konhaycam': 'Không nhạy cảm'
}

st.title('Vietnamese News Classification')

# load model
model = pickle.load(open('./best_model.sav', 'rb'))

# load feature extractor
feature_extractor = pickle.load(open('./feature_extractor.sav', 'rb'))

news = st.text_area('News input')

if news:

    # Tiền xử lý và loại bỏ stopwords
    start = time.time()
    data = preprocess.text_preprocessing(news)
    data = preprocess.remove_stopwords(data)
    preprocess_time = time.time() - start

    # Dự đoán
    start = time.time()
    np_data = np.array([data])
    feature = feature_extractor.transform(np_data)
    pred = model.predict(feature)
    result = name_result[pred[0]]
    predict_time = time.time() - start

    total = round(predict_time + preprocess_time, 2)

    # Hiện kết quả
    st.text('Kết quả: ' + result)
    st.text('Time: ' + str(total) + 's')
    #st.text('Data preprocessed: ' + data)
