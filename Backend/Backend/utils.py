from tensorflow import keras
from keras.preprocessing import image
# from tensorflow.keras.preprocessing import image
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np
import os
import cv2


def load_and_preprocess_image(img_path, target_size=(150, 150)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image
    return img_array

def display_image_and_prediction(model, image_path, class_names):
    print(image_path)
    # Load and preprocess the image
    img_array = load_and_preprocess_image(image_path)

    # Make a prediction
    try:
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)
        predicted_class_name = class_names[predicted_class]

        return predicted_class_name
    except Exception as e:
        print(e)
