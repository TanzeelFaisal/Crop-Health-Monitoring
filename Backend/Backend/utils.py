from tensorflow import keras
from keras.preprocessing import image
# from tensorflow.keras.preprocessing import image
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np
import os


def load_and_preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size);
    img_array = image.img_to_array(img);
    img_array = np.expand_dims(img_array, axis=0);
    img_array /= 255.0  # Normalize the image
    return img_array


def display_image_and_prediction(model, image_path, class_names):
    # plt.figure(figsize=(5, 5))

    # Load and preprocess the image
    img_array = load_and_preprocess_image(image_path)  # You need to define load_and_preprocess_image function

    # Make a prediction
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    predicted_class_name = class_names[predicted_class]

    # Check if the prediction is correct or not
    # true_class_name = os.path.basename(os.path.dirname(image_path))
    # if true_class_name == predicted_class_name:
    #     color = 'green'
    # else:
    #     color = 'red'

    return predicted_class_name

    # img = mpimg.imread(image_path)
    # plt.imshow(img)
    # plt.title(f"Predicted: {predicted_class_name}", color=color)
    # plt.axis("off")
    # plt.show()
