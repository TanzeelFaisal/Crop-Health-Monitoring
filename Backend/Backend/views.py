# views.py
from django.http import JsonResponse
from .utils import display_image_and_prediction
from tensorflow.keras.models import load_model
import os

# Load your Keras model
model_path = '525_saved_model.h5'
model = load_model(model_path)

# Define your class names
class_names = ['Weed', 'Crop', 'Leaf']  # Replace with your class names

def predict_image(request):
    if request.method == 'POST':
        # Assuming image data is sent in the 'image' field of the request
        image_data = request.FILES['image']

        # Save the uploaded image to a temporary location
        image_path = 'temp_image.jpg'
        with open(image_path, 'wb') as f:
            for chunk in image_data.chunks():
                f.write(chunk)

        # Make prediction
        prediction_result = display_image_and_prediction(model, image_path, class_names)

        # Delete temporary image file
        os.remove(image_path)

        return JsonResponse({'prediction': prediction_result})
    else:
        return JsonResponse({'error': 'POST method required'})
