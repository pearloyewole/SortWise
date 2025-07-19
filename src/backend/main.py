from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf
import io
from fastapi.middleware.cors import CORSMiddleware


# Load the trained model
model = tf.keras.models.load_model("garbage_classification_model_inception.h5")

# Define image dimensions
img_height = 384
img_width = 512

# Waste categories
waste_categories = ['Cardboard', 'Trash', 'Plastic', 'Metal', 'Glass', 'Paper']

# Define disposal information
disposal_info = {
    'Cardboard': "Cardboard waste can be recycled. Please flatten cardboard boxes before recycling.",
    'Trash': "Trash should be disposed of in the general waste bin.",
    'Plastic': "Plastic waste can often be recycled. Please check with your local recycling program.",
    'Metal': "Metal waste can often be recycled. Please check with your local recycling program.",
    'Glass': "Glass waste can often be recycled. Please check with your local recycling program.",
    'Paper': "Paper waste can be recycled. Please ensure it is clean and dry."
}

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev server URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def predict_image(img: Image.Image):
    # Resize and preprocess image
    img = img.resize((img_height, img_width))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Make prediction
    prediction = model.predict(img_array)
    category_index = np.argmax(prediction)

    if 0 <= category_index < len(waste_categories):
        category = waste_categories[category_index]
    else:
        category = "Unknown"

    return category

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        category = predict_image(image)

        return JSONResponse({
            "predicted_category": category,
            "disposal_info": disposal_info.get(category, "No info available")
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")
