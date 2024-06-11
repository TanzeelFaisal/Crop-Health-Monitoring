# views.py
from django.http import JsonResponse
from django.conf import settings
# from Backend.Backend import settings
from .utils import display_image_and_prediction
from tensorflow.keras.models import load_model
import os
from django.middleware.csrf import get_token
from django.http import JsonResponse

# Load your Keras model
model_filename = "Backend/model.h5"
model_path = os.path.join(settings.BASE_DIR, model_filename)
# model_path = 'model.h5'
model = load_model(model_path)

# Defining class mapping
class_names = ['Crop', 'Leaf', 'Weed']

# def predict_image(request):
#     if request.method == 'POST':
#         csrf_token = get_token(request)
#         # Assuming image data is sent in the 'image' field of the request
#         image_data = request.FILES['image']

#         # Save the uploaded image to a temporary location
#         image_path = 'temp_image.jpg'
#         with open(image_path, 'wb') as f:
#             for chunk in image_data.chunks():
#                 f.write(chunk)

#         # Make prediction
#         prediction_result = display_image_and_prediction(model, image_path, class_names)

#         # Delete temporary image file
#         os.remove(image_path)

#         return JsonResponse({'prediction': prediction_result, 'csrf_token': csrf_token})
#     else:
#         return JsonResponse({'error': 'POST method required'})

# def predict_image(request):
#     if request.method == 'POST':
#         # csrf_token = get_token(request)
#         # Assuming image data is sent in the 'image' field of the request
#         image_data = request.FILES['testimg']

#         # Save the uploaded image to a temporary location
#         image_path = 'temp_image.jpg'
#         with open(image_path, 'wb') as f:
#             for chunk in image_data.chunks():
#                 f.write(chunk)

#         # Make prediction
#         prediction_result = display_image_and_prediction(model, image_path, class_names)

#         # Delete temporary image file
#         os.remove(image_path)

#         # Return JSON response with prediction result and CSRF token
#         return JsonResponse({'prediction': prediction_result})
#     elif request.method == 'GET':
#         return JsonResponse({'message':'You are viewing'})
#         #return JsonResponse({'error': 'POST method required'})

def predict_image(request):
    if request.method == 'POST':
        # Iterate over the keys in request.FILES
        for _, file in request.FILES.items():
            # Save the uploaded image to a temporary location
            image_path = 'temp_image.jpg'
            with open(image_path, 'wb') as f:
                for chunk in file.chunks():
                    f.write(chunk)

            # Make prediction
            prediction_result = display_image_and_prediction(model, image_path, class_names)

            # Delete temporary image file
            os.remove(image_path)

            # Return JSON response with prediction result
            print(prediction_result)
            return JsonResponse({'prediction': prediction_result})

        # If no files are uploaded
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    elif request.method == 'GET':
        return JsonResponse({'message':'You are viewing'})
