import streamlit as st
import requests
from PIL import Image
import io

# Set FastAPI backend URL
FASTAPI_URL = "http://127.0.0.1:8000/predict/"

st.title("Waste Classification - Streamlit Frontend")
st.markdown("Upload an image of garbage and get a prediction from the FastAPI backend.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Display uploaded image
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image', use_container_width=True)

    if st.button("Classify"):
        with st.spinner("Sending to FastAPI backend..."):
            try:
                # Send image to FastAPI
                response = requests.post(
                    FASTAPI_URL,
                    files={"file": uploaded_file.getvalue()}
                )

                if response.status_code == 200:
                    data = response.json()
                    st.success(f"Predicted Category: **{data['predicted_category']}**")
                    st.info(data['disposal_info'])
                else:
                    st.error(f"Error {response.status_code}: {response.text}")

            except Exception as e:
                st.error(f"Failed to connect to backend: {e}")
