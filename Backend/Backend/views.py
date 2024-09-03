# views.py
from django.http import JsonResponse
from django.conf import settings
from ultralytics import YOLO
from .utils import display_image_and_prediction
from tensorflow.keras.models import load_model
import os
from django.middleware.csrf import get_token
from django.http import JsonResponse
import cv2
import base64
import numpy as np
from Backend.models import Records, Feedback

# Defining class mapping
class_names = ['Crop', 'Leaf', 'Weed']

def detect_weeds(request):
    # Load weed model
    model_name = 'best_weed'
    model = YOLO(f'Backend/{model_name}.pt')

    if request.method == 'POST':
        session_user_id = request.POST.get('user_id')
        # Iterate over the keys in request.FILES
        for _, file in request.FILES.items():
            # Save the uploaded image to a temporary location
            image_path = request.POST.get('filename') + '.jpg'
            with open(image_path, 'wb') as f:
                for chunk in file.chunks():
                    f.write(chunk)

            # Make prediction
            prediction_result = model.predict(source=image_path, save=True, show_conf=False)

            # Extract the directory where results are saved
            result_dir = prediction_result[0].save_dir
            result_image_path = os.path.join(result_dir, os.path.basename(image_path))

            # Check if the result image was saved
            if not os.path.exists(result_image_path):
                return JsonResponse({'error': 'Prediction image not found'}, status=500)

            # Convert the image to base64
            with open(result_image_path, 'rb') as img_file:
                img_data = img_file.read()
            img_base64 = base64.b64encode(img_data).decode('utf-8')

            # Remove the temporary image file and result image file
            os.remove(image_path)
            os.remove(result_image_path)

            # Save record to MongoDB
            record = Records(user_id=session_user_id, history={'prediction': 'result', 'image': img_base64})
            record.save()

            # Return JSON response with the base64 image
            return JsonResponse({'prediction': 'result', 'image': img_base64})

        # If no files are uploaded
        return JsonResponse({'error': 'No file uploaded'}, status=400)


disease_classes = ['bacterial spot',
                   'early blight',
                   'healthy',
                   'late blight',
                   'leaf mold',
                   'mosaic virus',
                   'septoria leaf spot',
                   'spider mites (two spotted spider mite)',
                   'target spot',
                   'yellow leaf curl virus']

def classify_diseases(request):
    fine_tuned_model_filename = "Backend/fine_tuned_model.h5"
    fine_tuned_model_path = os.path.join(settings.BASE_DIR, fine_tuned_model_filename)
    fine_tuned_model = load_model(fine_tuned_model_path)
    model_name = 'best_leaf'
    model = YOLO(f'Backend/{model_name}.pt')

    if request.method == 'POST':
        session_user_id = request.POST.get('user_id')
        for _, file in request.FILES.items():
            image_path = request.POST.get('filename') + '.jpg'
            with open(image_path, 'wb') as f:
                for chunk in file.chunks():
                    f.write(chunk)

            original_image = cv2.imread(image_path)

            predictions = model.predict(source=image_path, save=False, show_conf=False)[0]

            results = set()  # Use a set to store unique disease predictions

            for bbox in predictions.boxes:
                x1, y1, x2, y2 = bbox.xyxy[0].cpu().numpy().astype(int)

                cropped_leaf = original_image[y1:y2, x1:x2]

                cropped_leaf_resized = cv2.resize(cropped_leaf, (150, 150))
                cropped_leaf_array = np.expand_dims(cropped_leaf_resized, axis=0)

                disease_prediction = fine_tuned_model.predict(cropped_leaf_array)

                # Convert prediction to disease names
                predicted_class_index = np.argmax(disease_prediction)  # Assuming one-hot encoding with softmax
                predicted_disease_name = disease_classes[predicted_class_index]

                results.add(predicted_disease_name)  # Add disease name to the set

            os.remove(image_path)

            # Save record to MongoDB
            record = Records(user_id=session_user_id, history={'predictions': list(results)})
            record.save()

            return JsonResponse({'predictions': list(results)})  # Convert set to list for JSON response

        return JsonResponse({'error': 'No file uploaded'}, status=400)

    elif request.method == 'GET':
        return JsonResponse({'message': 'You are viewing'})


def fill_feedback(request):
    if request.method == 'POST':
        session_user_id = request.POST.get('user_id')
        session_user_first_name = request.POST.get('first_name')
        session_user_last_name = request.POST.get('last_name')
        session_user_feedback = request.POST.get('feedback')
        feedback = Feedback(user_id=session_user_id, firstname=session_user_first_name, lastname=session_user_last_name, description=session_user_feedback)
        feedback.save()
        return JsonResponse({'message': 'Feedback saved successfully'})
    else:
        return JsonResponse({'message': 'Could not save feedabck!'})


def history(request):
    if request.method == 'GET':
        session_user_id = request.GET.get('user_id')
        print(session_user_id)

        if not session_user_id:
            return JsonResponse({'error': 'User ID not provided'}, status=400)

        # Query the latest 10 records for the given user_id
        latest_records = Records.objects.filter(user_id=session_user_id).order_by('-created_at').limit(10)

        # Serialize records to JSON format
        serialized_records = []
        count = 1
        for record in latest_records:
            serialized_records.append({
                'id': count,
                'user_id': record.user_id,
                'history': record.history,
                'created_at': record.created_at.isoformat()  # Convert datetime to ISO format
            })
            count += 1

        count = 0
        # Return JSON response
        return JsonResponse({'latest_records': serialized_records})

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
